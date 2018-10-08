import compiler from '@ampproject/rollup-plugin-closure-compiler';
import filesize from 'rollup-plugin-filesize';
import babel from 'rollup-plugin-babel';
import path from 'path';

const contractPath = path.resolve( __dirname, 'contract.js');

const plugins = [
  babel({
    presets: [['@babel/preset-env', { modules: false }]]
  }),
  compiler({
    language_in: 'ECMASCRIPT5'
  }),
  filesize({
    format: {
      exponent: 0
    },
    showBrotliSize: true
  })
];

export default [{
  input: 'contract.js',
  output: {
    file: 'build/contract.min.js',
    name: 'contract',
    format: 'iife'
  },
  plugins
}, {
  input: 'dispatcher.js',
  external: [contractPath],
  output: {
    file: 'build/dispatcher.min.js',
    name: 'dispatcher',
    format: 'iife',
    globals: {
      [contractPath]: 'contract'
    }
  },
  plugins
}]
