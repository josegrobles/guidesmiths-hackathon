/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' },
          },
        ],
      },
    ],
  },
  output: { chunkFilename: 'vendors.js' },
  optimization: {
    minimizer: [
      new UglifyJSPlugin(),
    ],
    splitChunks: { chunks: 'all' },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|es/),
    
  ],
});
