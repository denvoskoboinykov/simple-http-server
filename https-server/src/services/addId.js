const { getNextId } = require('../helpers');

const addId = async (note, storeIdPath) => {
  const id = await getNextId(storeIdPath);

  const newNote = { ...note, id: id.toString() };

  return newNote;
};

module.exports = addId;
