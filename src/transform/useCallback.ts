import traverse, { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

function isDefinedBetween(
  path: NodePath<t.Identifier>,
  parentPath: NodePath,
  finalPath: NodePath
) {
  const binding = path.scope.getBinding(path.node.name);
  if (!binding) {
    return false;
  }
  let currentPath: NodePath | null = binding.path;
  while (currentPath) {
    if (currentPath === finalPath) {
      return true;
    }
    if (currentPath === parentPath) {
      return false;
    }
    currentPath = currentPath.parentPath;
  }
  return false;
}

export function processCallback(
  path: NodePath<t.FunctionDeclaration | t.ArrowFunctionExpression>,
  componentPath: NodePath<t.FunctionDeclaration | t.ArrowFunctionExpression>
) {
  if (
    t.isFunctionDeclaration(path) &&
    path.parentPath.parentPath !== componentPath
  ) {
    return;
  }

  if (
    t.isArrowFunctionExpression(path) &&
    path.parentPath.parentPath?.parentPath?.parentPath !== componentPath
  ) {
    return;
  }

  if (path.node.extra) {
    return;
  }

  const deps = new Set<string>();
  traverse(
    path.node,
    {
      Identifier(identifierPath) {
        if (
          identifierPath.parentKey === 'id' &&
          identifierPath.parentPath === path
        ) {
          return;
        }
        if (isDefinedBetween(identifierPath, path, componentPath)) {
          deps.add(identifierPath.node.name);
        }
      },
    },
    path.scope,
    {},
    path
  );

  const callback = t.arrowFunctionExpression(path.node.params, path.node.body);
  callback.extra = {
    type: 'useCallBackBody',
  };

  const init = t.callExpression(t.identifier('useCallback'), [
    callback,
    t.arrayExpression(Array.from(deps).map((name) => t.identifier(name))),
  ]);

  if (t.isFunctionDeclaration(path.node)) {
    const declaration = t.variableDeclaration('const', [
      t.variableDeclarator(path.node.id as t.Identifier, init),
    ]);
    declaration.loc = path.node.loc;
    path.replaceWith(declaration);
  } else {
    path.replaceWith(init);
  }
}
