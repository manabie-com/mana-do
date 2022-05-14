const path = require('path');
const paths = require('./paths');
const CopyWebpack = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        // should use babel-loader for all ts js tsx and jsx files
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        // should use style-loader and css-loader for all css files
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // v5 supports image loaders out of box
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project Title',
      // favicon: `${paths.src}/assets/icons/favicon.png`,
      template: `${paths.public}/index.html`, // template file
      filename: 'index.html', // output file
    }),
    new CopyWebpack({
      patterns: [{ from: 'src', to: 'dist' }],
    }),

    // compresses assets
    new BrotliGzipPlugin({
      asset: '[path].br[query]',
      algorithm: 'brotli',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      quality: 11,
    }),
    new BrotliGzipPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
