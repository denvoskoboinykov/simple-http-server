const { appendCSVFile, addId } = require('../../services');
const { isNote } = require('../../helpers');

const postNote = async (
  req,
  res,
  datebasePath,
  storeIdPath,
  noteProperties
) => {
  let body = '';

  await req.on('data', data => {
    body += data;
  });

  const parsedBody = JSON.parse(body);

  const notAcceptable = !isNote(parsedBody, noteProperties);

  if (notAcceptable) {
    res.writeHead(406);
    res.end('Your note object is invalid');

    return;
  }

  try {
    const newNote = await addId(parsedBody, storeIdPath);

    await appendCSVFile(newNote, datebasePath);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(newNote));
  } catch (error) {
    console.log(error);
    res.writeHead(500);
  }
  res.end();
};

module.exports = postNote;
