import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

function convertStateNameToSetState(name: string): string {
  return `set${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

/**
 *
 * @param path bingding path
 */
export function getStateCallback(
  path: NodePath<t.VariableDeclarator>,
  ComponentPath: NodePath<t.FunctionDeclaration | t.ArrowFunctionExpression>
) {
  // toplevel variable
  // expect VaraibleDeclarator <= VariableDeclaration <= BlockStatement <= FunctionDeclaration | ArrowFunctionExpression
  if (path.parentPath.parentPath?.parentPath === ComponentPath) {
    if (t.isVariableDeclarator(path.node)) {
      // is node marked
      if (path.node.extra && path.node.extra.type) {
        if (path.node.extra.type === 'useState') {
          return path.node.extra.change as string;
        }
        return;
      }
      // is init by use* hook
      const isInitByHook =
        t.isCallExpression(path.node.init) &&
        t.isIdentifier(path.node.init.callee) &&
        path.node.init.callee.name.startsWith('use');
      // change to useState
      if (!isInitByHook && t.isIdentifier(path.node.id)) {
        const setStateName = convertStateNameToSetState(path.node.id.name);
        const declarator = t.variableDeclarator(
          t.arrayPattern([path.node.id, t.identifier(setStateName)]),
          t.callExpression(
            t.identifier('useState'),
            path.node.init ? [path.node.init] : []
          )
        );
        // mark node as useState
        path.node.extra = declarator.extra = {
          type: 'useState',
          change: setStateName,
        };

        const declaration = t.variableDeclaration('const', [declarator]);
        path.parentPath.replaceWith(declaration);
        return setStateName;
      }
    }
  }
}

export function shouldProcess(path: NodePath<t.Identifier>) {
  // eg: a++ / a--
  if (t.isUpdateExpression(path.parent)) {
    return path.parent;
  }
  // eg: a += 1
  if (t.isAssignmentExpression(path.parent) && path.parentKey === 'left') {
    return path.parent.right;
  }
}

export function processIdentifier(
  path: NodePath<t.Identifier>,
  ComponentPath: NodePath<t.FunctionDeclaration | t.ArrowFunctionExpression>
) {
  const nextInit = shouldProcess(path);
  if (!nextInit) return;
  const binding = path.scope.getBinding(path.node.name);
  if (binding) {
    const stateCallback = getStateCallback(
      binding.path as NodePath<t.VariableDeclarator>,
      ComponentPath
    );
    if (stateCallback) {
      path.parentPath.replaceWith(
        t.callExpression(t.identifier(stateCallback), [nextInit])
      );
    }
  }
}
