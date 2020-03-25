const fs = require('fs');
const { promisify } = require('util');
const stringify = require('csv-stringify');
const csv = require('csvtojson');

const readFile = async pathName => {
  const notes = await csv().fromFile(pathName);

  return notes;
};

const writeFile = (pathName, notes, opts = 'utf8') => {
  const wf = promisify(fs.writeFile);
  const notesValue = notes.map(note => Object.values(note));

  notesValue.unshift(['name', 'description', 'rate', 'id']);

  stringify(notesValue, (err, data) => {
    if (err) {
      return console.log(err);
      // throw err;
    }
    wf(pathName, data, opts);
  });
};

const getIdFromUrl = url => url.split('/')[2];

const getLastId = async pathName => {
  const notes = await readFile(pathName);

  return notes[notes.length - 1].id;
};

const addId = async (note, pathName) => {
  const lastId = await getLastId(pathName);
  const id = Number(lastId) + 1;
  const newNote = { ...note, id };
  return newNote;
};

const addToFile = (note, pathName) => {
  const noteValues = Object.values(note);
  stringify([noteValues], (err, data) => {
    if (err) {
      return console.log(err);
      // throw err;
    }
    fs.appendFile(pathName, data, 'utf8', err => {
      if (err) {
        // throw err;
        console.log(err);
      }
    });
  });
};

module.exports = {
  readFile,
  writeFile,
  getIdFromUrl,
  addId,
  addToFile
};
