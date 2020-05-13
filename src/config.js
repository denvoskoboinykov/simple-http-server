const path = require('path');

const port = process.env.PORT || 8000;

const dbFolderPath = path.join(__dirname, '..', 'db');
const datebasePath = path.join(dbFolderPath, 'notes.csv');
const storeIdPath = path.join(dbFolderPath, 'idStore.json');

module.exports = {
  port,
  datebasePath,
  storeIdPath
};
