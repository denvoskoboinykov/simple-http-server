const findNoteById = (notes, id) => {
  const note = notes.find(note => note.id === id);

  return note || 'No note with this id';
};

module.exports = findNoteById;
