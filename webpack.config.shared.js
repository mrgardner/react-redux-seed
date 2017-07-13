const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('config');

if (!fs.existsSync(path.resolve(__dirname, 'dist/'))) {
  fs.mkdirSync(path.resolve(__dirname, 'dist/'));
  fs.writeFileSync(path.resolve(__dirname, 'dist/config.json'), JSON.stringify(config));
} else {
  fs.writeFileSync(path.resolve(__dirname, 'dist/config.json'), JSON.stringify(config));
}

module.exports = {
  context: path.resolve(__dirname, './src'),

  cache: true,

  resolve: {
    alias: {
      Config$: path.resolve(__dirname, 'dist/config.json')
    }
  },

  module: {
    rules: [

      {
        test: /\.scss|\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({
                    browsers: [
                      'last 2 versions',
                      '> 5%'
                    ]
                  })
                ]
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.js$|\.jsx$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [ require('babel-plugin-transform-object-rest-spread') ]
          }
        }
      },

      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [ 'url-loader?limit=10000&minetype=application/font-woff' ]
      },

      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: [ 'file-loader' ]
      }

    ]

  },

  plugins: [

    new HtmlWebpackPlugin({
      template: './index.html'
    }),

    new ExtractTextPlugin({
      filename: 'styles.css'
    }),

    new ProgressBarPlugin()

  ]
};
