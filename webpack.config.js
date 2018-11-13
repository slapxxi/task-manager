const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

dotenv.config();

const defaultConfiguration = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.css'],
    alias: {
      '@lib': path.resolve(__dirname, 'src', 'lib'),
      '@local': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [new SpriteLoaderPlugin(), new webpack.HashedModuleIdsPlugin()],
};

module.exports = defaultConfiguration;
