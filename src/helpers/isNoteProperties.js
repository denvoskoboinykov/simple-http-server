const isNoteProperties = (note, noteProperties) => {
  const noteKeys = Object.keys(note);
  const hasOnlyRequiredProperties = noteKeys.every(key =>
    noteProperties.includes(key)
  );

  return hasOnlyRequiredProperties;
};

module.exports = isNoteProperties;
