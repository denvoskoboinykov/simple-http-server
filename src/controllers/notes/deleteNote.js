const { readCSVFile, writeCSVFile, deleteNoteById } = require('../../services');

const deleteNote = async (res, datebasePath, id) => {
  try {
    const notes = await readCSVFile(datebasePath);

    const newNotes = deleteNoteById(notes, id);

    await writeCSVFile(datebasePath, newNotes);

    res.writeHead(200);
    res.write('Note was deleted');
  } catch (error) {
    console.log(error);
    res.writeHead(500);
  }

  res.end();
};

module.exports = deleteNote;
