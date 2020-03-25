const mainRoute = require('./routes/main');
const notesRoute = require('./routes/notes');

const router = {
  notes: notesRoute,
  default: mainRoute
};

module.exports = router;
