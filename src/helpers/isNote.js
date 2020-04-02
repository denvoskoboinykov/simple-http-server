const isNote = (note, noteProperties) => {
  const noteKeys = Object.keys(note);
  const hasRequiredProperties = noteKeys.every(key =>
    noteProperties.includes(key)
  );

  return hasRequiredProperties;
};

module.exports = isNote;
