const fs = require('fs');
const stream = require('stream');
const byline = require('byline');

class ParseStream extends stream.Transform {
  constructor({ limitRows }) {
    super({ objectMode: true });
    this.limitRows = limitRows;
    this.rowsWritten = 0;
  }
  _transform(chunk, encoding, done) {
    const obj = JSON.parse(chunk);
    if (!this.limitRows || this.rowsWritten < this.limitRows) {
      this.push(obj);
      this.rowsWritten += 1;
    }
    done();
  }
}

async function reader({ fileName, encoding = 'utf-8', limitRows = undefined }) {
  console.log(`Reading file ${fileName}`);

  const fileStream = fs.createReadStream(fileName, encoding);
  const liner = byline(fileStream);
  const parser = new ParseStream({ limitRows });
  liner.pipe(parser);
  return parser;
}

module.exports = reader;
