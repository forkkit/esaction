const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: {
    inline: './src/inline.js',
    async: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ScriptExtHtmlWebpackPlugin({
      // inline chunks required for inline.js
      inline: ['inline', 'contract', 'runtime'],
      defaultAttribute: 'defer'
    })
  ],
  optimization: {
    // use one runtime for all chunks
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        // create chunk for contract
        contract: {
          name: 'contract',
          chunks: 'all',
          test: require.resolve('esaction/contract.js')
        }
      }
    }
  }
};
