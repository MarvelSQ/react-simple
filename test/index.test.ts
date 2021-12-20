import * as babel from '@babel/core';
import ReactSimple from '../src';

const simpleCode = `
function App() {
  let state = 1;
  let enable = true;
  function handleAdd() {
    const enable = false;
    enable = !enable;
    state = state + 1;
  }
  return <div onClick={handleAdd}>{state}</div>;
}`;

describe('simple', () => {
  test('let state', () => {
    const result = babel.transformSync(simpleCode, {
      presets: ['@babel/preset-react'],
      plugins: [ReactSimple],
    });

    expect(result?.code).toMatchSnapshot();
  });
});
