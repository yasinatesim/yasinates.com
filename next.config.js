const withImages = require('next-images');

module.exports = {
  target: 'server',
  ...withImages(),
};
