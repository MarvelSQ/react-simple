import { declare } from '@babel/helper-plugin-utils';
import traverse, { Visitor } from '@babel/traverse';
import * as t from '@babel/types';
import { processCallback } from './transform/useCallback';
import { processIdentifier } from './transform/useState';

/**
 *
 */
export default declare(
  (
    _api,
    {
      useCallback = true,
    }: {
      useCallback: boolean;
    } = {
      useCallback: true,
    }
  ) => ({
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
              useCallback && processCallback(functionPath, path);
            },
            ArrowFunctionExpression(functionPath) {
              useCallback && processCallback(functionPath, path);
            },
          },
          path.scope,
          state,
          path
        );
      },
    } as Visitor,
  })
);
