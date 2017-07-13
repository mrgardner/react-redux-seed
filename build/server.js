// Disable eslint for `colors`
/* eslint-disable no-unused-vars */

const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevConfig = require('../webpack.config.dev');
const webpackProdConfig = require('../webpack.config.prod');
const open = require('open');
const config = require('config');

/* eslint-disable no-console */

const isDev = process.env.NODE_ENV === 'development';
const hostname = 'localhost'
// const hostname = config.get('hostname');
// const port = config.get('port');
const port = 3000;
const app = express();
let webpackConfig = '';

if (isDev) {
  webpackConfig = webpackDevConfig;
} else {
  webpackConfig = webpackProdConfig;
}

const compiler = webpack(webpackConfig);

if (isDev) {

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

console.log('Starting the development environment...'.green);
} else {
  app.use(express.static('dist'));

  console.log('Starting the production environment...'.green);
}

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err.red);
  } else {
    open(`http://${hostname}:${port}`);
  }
});
