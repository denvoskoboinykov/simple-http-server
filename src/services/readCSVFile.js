const csv = require('csvtojson');

const readCSVFile = async datebasePath => {
  const notes = await csv().fromFile(datebasePath);

  return notes;
};

module.exports = readCSVFile;
