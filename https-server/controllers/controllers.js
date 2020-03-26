const {
  readCSVFile,
  writeCSVFile,
  appendCSVFile,
  getIdFromUrl,
  addId,
  isNote,
  isNoteProperties
} = require('../services/services');

const post = async (req, res, datebasePath, storeIdPath) => {
  let body = '';

  await req.on('data', data => {
    body += data;
  });

  const parsedBody = JSON.parse(body);
  const notAcceptable = !isNote(parsedBody);
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

const get = async (req, res, datebasePath) => {
  const id = getIdFromUrl(req.url);

  try {
    const notes = await readCSVFile(datebasePath);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    if (id) {
      const note = notes.find(note => note.id === id);
      res.write(JSON.stringify(note));
    } else {
      res.write(JSON.stringify(notes));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500);
  }

  res.end();
};

const update = async (req, res, datebasePath) => {
  const id = getIdFromUrl(req.url);
  let body = '';

  await req.on('data', data => {
    body += data;
  });

  const parsedBody = JSON.parse(body);

  const notAcceptable = !isNoteProperties(parsedBody);
  if (notAcceptable) {
    res.writeHead(406); //ГЛЯНУТЬ КОДЫ ОШИБОК
    res.end('Your updated properties are invalid');
    return;
  }

  const notes = await readCSVFile(datebasePath);
  let updatedNote = {};

  const newNotes = notes.map(note => {
    if (note.id === id) {
      updatedNote = { ...note, ...parsedBody };
      return updatedNote;
    } else {
      return note;
    }
  });

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

const deleteNote = async (req, res, datebasePath) => {
  const id = getIdFromUrl(req.url);

  try {
    const notes = await readCSVFile(datebasePath);
    const newNotes = notes.filter(note => note.id !== id);

    await writeCSVFile(datebasePath, newNotes);
    res.writeHead(200);
    res.write('Note was deleted');
  } catch (error) {
    console.log(error);
    res.writeHead(500);
  }

  res.end();
};

const notFound = res => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write('<h1>Your path/method is invalid</h1>');
  res.end();
};

module.exports = { post, get, update, deleteNote, notFound };
