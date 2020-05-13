const readCSVFile = require('./readCSVFile');
const writeCSVFile = require('./writeCSVFile');
const appendCSVFile = require('./appendCSVFile');
const findNoteById = require('./findNoteById');
const addId = require('./addId');
const updateProperties = require('./updateProperties');
const deleteNoteById = require('./deleteNoteById');

module.exports = {
  readCSVFile,
  writeCSVFile,
  appendCSVFile,
  findNoteById,
  addId,
  updateProperties,
  deleteNoteById
};
