const {
  post,
  get,
  update,
  deleteNote,
  notFound
} = require('../../controllers/controllers');

const notesRoute = (req, res, datebasePath, storeIdPath) => {
  switch (req.method) {
    case 'GET':
      get(req, res, datebasePath);
      break;
    case 'POST':
      post(req, res, datebasePath, storeIdPath);
      break;
    case 'PATCH':
      update(req, res, datebasePath);
      break;
    case 'DELETE':
      deleteNote(req, res, datebasePath);
      break;
    default:
      notFound(res);
      break;
  }
};

module.exports = notesRoute;
