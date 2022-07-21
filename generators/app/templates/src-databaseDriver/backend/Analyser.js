const { DatabaseAnalyser } = require('dbgate-tools');

class Analyser extends DatabaseAnalyser {
  constructor(connection, driver) {
    super(connection, driver);
  }

  async _runAnalysis() {
    this.feedback({ analysingMessage: 'Loading tables' });
    await new Promise((r) => setTimeout(r, 2000)); // load tables...
    this.feedback({ analysingMessage: null });

    // return structure as DatabaseInfo (https://github.com/dbgate/dbgate/blob/master/packages/types/dbinfo.d.ts)
    return {
      tables: [
        {
          objectId: 'table1',
          pureName: 't1',
          columns: [
            {
              columnName: 'c1',
            },
          ],
        },
      ],
    };
  }
}

module.exports = Analyser;
