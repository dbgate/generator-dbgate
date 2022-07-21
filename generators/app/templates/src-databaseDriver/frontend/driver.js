const { driverBase } = require('dbgate-tools');
const Dumper = require('./Dumper');

/** @type {import('dbgate-types').SqlDialect} */
const dialect = {
  limitSelect: true,
  rangeSelect: true,
  offsetFetchRangeSyntax: true,
  stringEscapeChar: "'",
  fallbackDataType: 'nvarchar(max)',
  quoteIdentifier(s) {
    return `[${s}]`;
  },
};

/** @type {import('dbgate-types').EngineDriver} */
const driver = {
  ...driverBase,
  dumperClass: Dumper,
  dialect,
  engine: '<%= camelName %>@<%= packageName %>',
  title: 'My Database Engine',
  showConnectionField: (field, values) => {
    return ['server', 'port', 'user', 'password', 'defaultDatabase', 'singleDatabase', 'isReadOnly'].includes(field);
  },
};

module.exports = driver;
