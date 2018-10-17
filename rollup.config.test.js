import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'tests/index.js',
  output: {
    file: 'build/tests.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        chai: ['expect']
      }
    }),
    babel({
      presets: [['@babel/preset-env', {
        modules: false,
        targets: {
          ie: '9',
          safari: '8'
        }
      }]]
    })
  ]
};
