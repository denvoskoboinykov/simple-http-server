const { readCSVFile } = require('../../services');

const getNotes = async (res, datebasePath) => {
  try {
    const notes = await readCSVFile(datebasePath);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(notes));
  } catch (error) {
    console.log(error);
    res.writeHead(500);
  }

  res.end();
};

module.exports = getNotes;
