const path = require('path');
const {
  post,
  get,
  update,
  deleteNote,
  notFound
} = require('../../controllers/controllers');

const notesRoute = (req, res) => {
  const pathName = path.join(__dirname, '..', '..', 'db', 'file.csv');

  switch (req.method) {
    case 'GET':
      get(req, res, pathName);
      break;
    case 'POST':
      post(req, res, pathName);
      break;
    case 'PATCH':
      update(req, res, pathName);
      break;
    case 'DELETE':
      deleteNote(req, res, pathName);
      break;
    default:
      notFound(res);
      break;
  }
};

module.exports = notesRoute;
