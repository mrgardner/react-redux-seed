const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const VersionFile = require('webpack-version-file');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const sharedConfig = require('./webpack.config.shared');

module.exports = webpackMerge(sharedConfig, {
  entry: path.resolve(__dirname, './src/index.js'),

  devtool: 'cheap-module-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `bundle.js`,
    publicPath: '/'
  },

  plugins: [

    // new VersionFile({
    //   output: './dist/version.txt',
    //   templateString: `<%= name %>@<%= version %>#<%= sha %>\nBuild date: <%= buildDate %>`,
    //   data: {
    //     sha: require('child_process').execSync('git rev-parse --short HEAD')
    //   }
    // }),

    // @TODO: Is this necessary? (KSB-438)
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new UglifyJSPlugin({
      compress: { warnings: false }
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true
    })

  ]
});
