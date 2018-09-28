const path = require('path');
const webpack = require('webpack');

const config = require('./config.json');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['babel-polyfill', 'react-hot-loader/patch', './index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [new webpack.DefinePlugin({ CONFIG: JSON.stringify(config) })],
};
