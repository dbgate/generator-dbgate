const reader = require('./reader');
const writer = require('./writer');

module.exports = {
  packageName: '<%= packageName %>',
  shellApi: {
    reader,
    writer,
  },
};
