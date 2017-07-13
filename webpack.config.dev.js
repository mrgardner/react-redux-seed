const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const sharedConfig = require('./webpack.config.shared');

module.exports = webpackMerge(sharedConfig, {
  entry: [ path.resolve(__dirname, './src/index.js'), 'webpack-hot-middleware/client?reload=true' ],

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    sourceMapFilename: '[file].map'
  },

  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin()

  ]
});
