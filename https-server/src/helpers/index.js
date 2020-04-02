const isNote = require('./isNote');
const isNoteProperties = require('./isNoteProperties');
const getNextId = require('./getNextId');
const { getPath, getIdFromUrl } = require('./urlParse');

module.exports = { isNote, isNoteProperties, getNextId, getPath, getIdFromUrl };
