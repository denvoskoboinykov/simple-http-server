const fs = require('fs');
const stringify = require('csv-stringify');

const writeCSVFile = (datebasePath, notes, opts = 'utf8') => {
  const notesValue = notes.map(note => Object.values(note));
  const notesKeys = Object.keys(notes[0]);

  notesValue.unshift(notesKeys);

  stringify(notesValue, (err, data) => {
    if (err) {
      throw err;
    }

    fs.writeFile(datebasePath, data, opts, err => {
      if (err) {
        throw err;
      }
    });
  });
};

module.exports = writeCSVFile;
