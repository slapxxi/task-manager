module.exports = {
  env: {
    test: {
      presets: [['@babel/env', { targets: { node: 'current' } }]],
    },
  },
  presets: ['@babel/env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
