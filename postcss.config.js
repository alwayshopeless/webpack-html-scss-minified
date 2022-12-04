const path = require('path');

module.exports = {
  plugins: ['postcss-preset-env'],

  output: {
    path: path.resolve(__dirname, 'public/scss'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },


};
