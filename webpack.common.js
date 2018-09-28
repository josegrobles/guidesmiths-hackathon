const path = require('path');
const webpack = require('webpack');

const generateConfig = require('./config');

const config = generateConfig(process.env.SERVICE_ENV);

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
