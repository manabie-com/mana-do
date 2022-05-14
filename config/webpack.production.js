const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('prod'),
    }),
    new Dotenv({
      path: process.env.NODE_ENV === 'production' ? './.env.production' : './.env.development',
    }),
  ],
};
