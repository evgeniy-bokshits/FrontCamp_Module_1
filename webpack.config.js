const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const isProd = env === 'production';

const extractScss = new ExtractTextPlugin({
  filename: 'index.css',
  disable: isDev
});

module.exports = {
        entry: {
          bundle: './src/index.js'
        },
        resolve: {
          extensions: ['.js', '.scss'],
          alias: {
              '@infrastructure': path.resolve(__dirname, './src/app/infrastructure'),
              '@services': path.resolve(__dirname, './src/app/services'),
              '@models': path.resolve(__dirname, './src/app/models'),
			  '@utilities': path.resolve(__dirname, './src/app/utilities')
          }
      },
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'bundle.js'
        },
        devtool: 'inline-source-map',
        plugins: [
          new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
          }),
          extractScss
        ],
        module: {
          rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          }, {
            test: /(\.css|\.scss)$/,
            exclude: /node_modules/,
          use: extractScss.extract({
              use:[
                {loader: 'css-loader'},
                {loader: 'sass-loader'}
              ],
            fallback: 'style-loader'
          })
        }]
    }
};