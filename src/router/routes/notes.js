const {
  postNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote
} = require('../../controllers/notes');
const notFound = require('../../controllers/notFound');
const { getIdFromUrl } = require('../../helpers');
const language = require('../../models/language');

const notesRoute = (req, res, datebasePath, storeIdPath) => {
  const id = getIdFromUrl(req.url);

  switch (req.method) {
    case 'GET':
      if (id) {
        getNote(res, datebasePath, id);
      } else {
        getNotes(res, datebasePath);
      }
      break;
    case 'POST':
      postNote(req, res, datebasePath, storeIdPath, language);
      break;
    case 'PATCH':
      updateNote(req, res, datebasePath, id, language);
      break;
    case 'DELETE':
      deleteNote(res, datebasePath, id);
      break;
    default:
      notFound(res);
      break;
  }
};

module.exports = notesRoute;
