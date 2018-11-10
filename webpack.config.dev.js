const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const defaultConfiguration = require('./webpack.config');

const sourceFolderPath = path.resolve(__dirname, 'src');
const assetsFolderPath = path.resolve(__dirname, 'src', 'assets');

const developmentConfiguration = {
  ...defaultConfiguration,
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        include: sourceFolderPath,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: sourceFolderPath,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.svg$/,
        include: assetsFolderPath,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: { esModule: false },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: false },
                { convertStyleToAttrs: false },
                { convertPathData: { floatPrecision: 2 } },
              ],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    ...defaultConfiguration.plugins,
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: 'development',
        ...process.env,
      }),
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html',
    }),
  ],
};

module.exports = developmentConfiguration;
