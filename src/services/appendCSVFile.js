const fs = require('fs');
const stringify = require('csv-stringify');

const appendCSVFile = (note, datebasePath) => {
  const noteValues = Object.values(note);
  stringify([noteValues], (err, data) => {
    if (err) {
      throw err;
    }
    fs.appendFile(datebasePath, data, 'utf8', err => {
      if (err) {
        throw err;
      }
    });
  });
};

module.exports = appendCSVFile;
