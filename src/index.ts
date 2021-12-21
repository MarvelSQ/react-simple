import { types as t, Visitor, NodePath } from '@babel/core';
import traverse from '@babel/traverse';

function callUseState(declarator: t.VariableDeclarator) {
  if (t.isIdentifier(declarator.id)) {
    const idName = declarator.id.name;
    const changeName = `set${idName.charAt(0).toUpperCase()}${idName.slice(1)}`;

    declarator.id.extra = {
      type: 'useState',
      value: idName,
      onChange: changeName,
    };
    return t.variableDeclarator(
      t.arrayPattern([t.identifier(idName), t.identifier(changeName)]),
      t.callExpression(t.identifier('useState'), [
        declarator.init as t.Expression,
      ])
    );
  }
  return declarator;
}

function callUseCallback(path: NodePath<t.FunctionDeclaration>) {
  const deps: t.Identifier[] = [];

  traverse(
    path.node,
    {
      AssignmentExpression(path) {
        if (t.isIdentifier(path.node.left)) {
          const binding = path.scope.getBinding(path.node.left.name);
          // modified identifier
          if (binding?.identifier.extra?.type === 'useState') {
            deps.push(t.identifier(binding.identifier.extra.value as string));

            path.replaceWith(
              t.callExpression(
                t.identifier(binding.identifier.extra.onChange as string),
                [path.node.right]
              )
            );
          }
        }
      },
    },
    path.scope,
    {},
    path
  );

  return t.variableDeclaration('const', [
    t.variableDeclarator(
      path.node.id as t.Identifier,
      t.callExpression(t.identifier('useCallback'), [
        t.arrowFunctionExpression(
          path.node.params,
          t.blockStatement(path.node.body.body)
        ),
        t.arrayExpression(deps),
      ])
    ),
  ]);
}

export default {
  name: 'ReactSimple',
  visitor: {
    FunctionDeclaration(path, state) {
      if (!t.isProgram(path.parent)) {
        return;
      }

      // transform state to useState
      traverse(
        path.node,
        {
          VariableDeclaration(varPath) {
            if (
              varPath.parent === path.node.body &&
              varPath.node.kind === 'let' &&
              varPath.node.extra?.type !== 'handled'
            ) {
              const declaration = t.variableDeclaration(
                'const',
                varPath.node.declarations.map((declarator) => {
                  return callUseState(declarator);
                })
              );
              declaration.extra = {
                type: 'handled',
              };
              varPath.replaceWith(declaration);
            }
          },
        },
        path.scope,
        state,
        path
      );

      // transform function to useCallback
      traverse(
        path.node,
        {
          FunctionDeclaration(funcPath) {
            if (funcPath.parent === path.node.body) {
              funcPath.replaceWith(callUseCallback(funcPath));
            }
          },
        },
        path.scope,
        state,
        path
      );
      // path.node.body.body = path.node.body.body.map((node) => {
      //   // if (t.isVariableDeclaration(node) && node.kind === 'let') {
      //   //   return t.variableDeclaration(
      //   //     'const',
      //   //     node.declarations.map((declarator) => {
      //   //       return callUseState(declarator);
      //   //     })
      //   //   );
      //   // }
      //   // if (t.isFunctionDeclaration(node)) {
      //   //   return callUseCallback(node, path.scope);
      //   // }
      //   return node;
      // });
    },
  } as Visitor,
};
