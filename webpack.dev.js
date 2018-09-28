const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const generateConfig = require('./config');

const { routes } = generateConfig(process.env.SERVICE_ENV);

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
  devServer: {
    hot: true,
    contentBase: './',
    historyApiFallback: true,
    setup: (app) => {
      app.get('/config', (req, res) => {
        res.json(routes.api);
      });
    },
  },
  devtool: 'cheap-module-source-map',
});
