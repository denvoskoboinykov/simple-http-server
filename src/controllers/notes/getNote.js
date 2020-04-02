const { readCSVFile, findNoteById } = require('../../services');

const getNote = async (res, datebasePath, id) => {
  try {
    const notes = await readCSVFile(datebasePath);

    const note = findNoteById(notes, id);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(note));
  } catch (error) {
    console.log(error);
    res.writeHead(500);
  }

  res.end();
};

module.exports = getNote;
