import resolve from 'rollup-plugin-node-resolve';
import del from 'rollup-plugin-delete';
import htmlBundle from 'rollup-plugin-html-bundle';
import compiler from '@ampproject/rollup-plugin-closure-compiler';

const contractPath = require.resolve('esaction/contract.js');
const contractName = 'contract';

export default [{
  input: 'src/inline.js',
  output: {
    file: 'build/inline.js',
    name: contractName,
    format: 'iife'
  },
  plugins: [
    del({ targets: 'build/**/*' }),
    resolve(),
    htmlBundle({
      template: 'src/index.html',
      target: 'build/index.html',
      targetElement: 'head',
      inline: true
    }),
    compiler()
  ]
}, {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'iife',
    globals: {
      [contractPath]: contractName
    }
  },
  plugins: [
    resolve(),
    compiler()
  ],
  external: [
    contractPath
  ]
}];
