const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const defaultConfiguration = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.css'],
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
