const _ = require('lodash');
const stream = require('stream');
const driverBase = require('../frontend/driver');
const Analyser = require('./Analyser');

/** @type {import('dbgate-types').EngineDriver} */
const driver = {
  ...driverBase,
  analyserClass: Analyser,
  // creating connection
  async connect({ server, port, user, password, database }) {
    // const connection = new NativeConnection({
    //   server,
    //   port,
    //   user,
    //   password,
    //   database,
    // });
    // await connection.connect();
    // return connection;
    return {
      connectionType: 'DUMMY',
    };
  },
  // called for retrieve data (eg. browse in data grid) and for update database
  async query(connection, sql) {
    return {
      rows: [],
      columns: [],
    };
  },
  // called in query console
  async stream(connection, sql, options) {
    return null;
  },
  // called when exporting table or view
  async readQuery(connection, sql, structure) {
    const pass = new stream.PassThrough({
      objectMode: true,
      highWaterMark: 100,
    });

    // pass.write(structure)
    // pass.write(row1)
    // pass.write(row2)
    // pass.end()

    return pass;
  },
  // called when importing into table or view
  async writeTable(connection, name, options) {
    return createBulkInsertStreamBase(this, stream, pool, name, options);
  },
  // detect server version
  async getVersion(connection) {
    return { version: '1.0.0' };
  },
  // list databases on server
  async listDatabases(connection) {
    return [{ name: 'db1' }, { name: 'db2' }];
  },
};

module.exports = driver;
