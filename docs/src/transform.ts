import * as parser from '@babel/parser';
import generator from '@babel/generator';
import traverse from '@babel/traverse';
import simple from '../../src/index';

export function transform(code: string) {
  const ast = parser.parse(code, {
    plugins: ['jsx', 'typescript'],
  });

  traverse(ast, simple.visitor);

  const out = generator(ast, {
    retainLines: true,
  });

  return out;
}
