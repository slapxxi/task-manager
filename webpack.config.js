const path = require('path');
const dotenv = require('dotenv');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

dotenv.config();

const defaultConfiguration = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.css'],
    alias: {
      '@local': path.resolve(__dirname, 'src'),
    },
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
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [new SpriteLoaderPlugin()],
};

module.exports = defaultConfiguration;
