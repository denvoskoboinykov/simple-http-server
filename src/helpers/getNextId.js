const fs = require('fs');
const { promisify } = require('util');

const getNextId = async storeIdPath => {
  const rf = promisify(fs.readFile);
  const wf = promisify(fs.writeFile);

  const idStore = await rf(storeIdPath);
  const parsedIdStore = JSON.parse(idStore);

  const nextId = parsedIdStore.nextId;
  const newIdStore = { nextId: nextId + 1 };

  wf(storeIdPath, JSON.stringify(newIdStore));

  return nextId;
};

module.exports = getNextId;
