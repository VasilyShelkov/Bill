var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'eventsource-polyfill', //necessary evil for hot loading with IE
    'webpack-hot-middleware/client',
    './app/App.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'app')
    }, {
      test: /\.css$/,
      loader: 'style!css',
      include: path.join(__dirname, 'css')
    }]
  }
};