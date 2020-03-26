const path = require('path');

const port = 8000;

const dbFolderPath = path.join(__dirname, '..', 'db');
const datebasePath = path.join(dbFolderPath, 'db.csv');
const storeIdPath = path.join(dbFolderPath, 'idStore.json');

const noteProperties = ['name', 'description', 'rate'];

module.exports = {
  port,
  datebasePath,
  storeIdPath,
  noteProperties
};
