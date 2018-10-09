const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const defaultConfiguration = require('./webpack.config');

const productionConfiguration = {
  ...defaultConfiguration,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          {
            loader: 'typings-for-css-modules-loader',
            options: { modules: true, namedExport: true },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: { esModule: false },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertStyleToAttrs: false },
                { convertPathData: { floatPrecision: 2 } },
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    ...defaultConfiguration.optimization,
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
      }),
    ],
  },
  plugins: [
    ...defaultConfiguration.plugins,
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: 'production',
        ...process.env,
      }),
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'prod.index.html',
    }),
  ],
};

module.exports = productionConfiguration;
