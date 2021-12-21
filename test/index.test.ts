import path from 'path';
import ReactSimple from '../src';
import pluginTester from 'babel-plugin-tester';

pluginTester({
  plugin: ReactSimple,
  pluginName: 'react-simple',
  babelOptions: {
    presets: ['@babel/preset-react'],
  },
  fixtures: path.join(__dirname, '__fixtures__'),
});
