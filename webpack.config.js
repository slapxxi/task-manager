// @ts-check
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const env = 'development';

/** @type webpack.Configuration */

module.exports = {
  mode: env,
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.css'],
  },
  entry: './src/index.tsx',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[chunkhash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          // { loader: MiniCSSExtractPlugin.loader },
          { loader: 'style-loader' },
          {
            loader: 'typings-for-css-modules-loader',
            options: { modules: true, namedExport: true },
          },
          { loader: 'postcss-loader' },
        ],
        exclude: /node_modules/,
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
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new SpriteLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Demo Application',
      template: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    // new MiniCSSExtractPlugin({
    //   filename: env === 'development' ? '[name].css' : '[name].[hash].css',
    //   chunkFilename: env === 'development' ? '[id].css' : '[id].[hash].css',
    // }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
