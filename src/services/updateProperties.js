const updateProperties = (notes, id, newValues) => {
  let updatedNote = {};

  const newNotes = notes.map(note => {
    if (note.id === id) {
      updatedNote = {
        ...note,
        ...newValues
      };

      return updatedNote;
    } else {
      return note;
    }
  });

  return { newNotes, updatedNote };
};

module.exports = updateProperties;
