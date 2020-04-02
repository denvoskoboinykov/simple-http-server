const {
  readCSVFile,
  writeCSVFile,
  updateProperties
} = require('../../services');
const { isNoteProperties } = require('../../helpers');

const updateNote = async (req, res, datebasePath, id, noteProperties) => {
  let body = '';

  await req.on('data', data => {
    body += data;
  });

  const parsedBody = JSON.parse(body);

  const notAcceptable = !isNoteProperties(parsedBody, noteProperties);

  if (notAcceptable) {
    res.writeHead(406);
    res.end('Your updated properties are invalid');

    return;
  }

  const notes = await readCSVFile(datebasePath);

  const { newNotes, updatedNote } = updateProperties(notes, id, parsedBody);

  try {
    await writeCSVFile(datebasePath, newNotes);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(updatedNote));
  } catch (error) {
    console.log(error);
    res.writeHead(500);
  }
  res.end();
};

module.exports = updateNote;
