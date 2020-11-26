const <%= camelName %>Reader = require('./<%= camelName %>Reader');
const <%= camelName %>Writer = require('./<%= camelName %>Writer');

module.exports = {
  packageName: '<%= packageName %>',
  shellApi: {
    <%= camelName %>Reader,
    <%= camelName %>Writer,
  },
};
