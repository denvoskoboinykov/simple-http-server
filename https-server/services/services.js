const fs = require('fs');
// const { promisify } = require('util');
const stringify = require('csv-stringify');
const csv = require('csvtojson');
const { getNextId } = require('../helpers/helpers');
const { noteProperties } = require('../config/config');

const readCSVFile = async datebasePath => {
  const notes = await csv().fromFile(datebasePath);

  return notes;
};

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

const getIdFromUrl = url => url.split('/')[2];

const addId = async (note, storeIdPath) => {
  const id = await getNextId(storeIdPath);

  const newNote = { ...note, id: id.toString() };

  return newNote;
};

const isNote = note => {
  const noteKeys = Object.keys(note);
  const hasRequiredProperties = noteKeys.every(key =>
    noteProperties.includes(key)
  );

  return hasRequiredProperties;
};

const isNoteProperties = note => {
  const noteKeys = Object.keys(note);
  const hasOnlyRequiredProperties = noteKeys.every(key =>
    noteProperties.includes(key)
  );

  return hasOnlyRequiredProperties;
};

module.exports = {
  readCSVFile,
  writeCSVFile,
  appendCSVFile,
  getIdFromUrl,
  addId,
  isNote,
  isNoteProperties
};
