import { types as t, Visitor } from '@babel/core';
import traverse from '@babel/traverse';
import { processCallback } from './transform/useCallback';
import { processIdentifier } from './transform/useState';

export default {
  name: 'ReactSimple',
  visitor: {
    FunctionDeclaration(path, state) {
      if (!t.isProgram(path.parent)) {
        return;
      }

      traverse(
        path.node,
        {
          Identifier(identifierPath) {
            processIdentifier(identifierPath, path);
          },
          FunctionDeclaration(functionPath) {
            processCallback(functionPath, path);
          },
          ArrowFunctionExpression(functionPath) {
            processCallback(functionPath, path);
          },
        },
        path.scope,
        state,
        path
      );
    },
  } as Visitor,
};
