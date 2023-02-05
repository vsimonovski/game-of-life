/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path');
const jestConfig = require('./jest.config');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: jestConfig,
  },
};
