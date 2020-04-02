const deleteNoteById = (notes, id) => {
  const newNotes = notes.filter(note => note.id !== id);

  return newNotes;
};

module.exports = deleteNoteById;
