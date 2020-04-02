const path = require('path');
const fs = require('fs');
const {
  findNoteById,
  addId,
  updateProperties,
  deleteNoteById
} = require('../services');

/*eslint-disable*/
describe('findNoteById service', () => {
  test('findNoteById() returns correct note', () => {
    const note1 = { id: 1, name: 'first' };
    const note2 = { id: 2, name: 'second' };

    const notes = [note1, note2];

    expect(findNoteById(notes, 2)).toBe(note2);
  });

  test('findNoteById() returns string answer', () => {
    const note1 = { id: 1, name: 'first' };
    const note2 = { id: 2, name: 'second' };

    const notes = [note1, note2];

    expect(findNoteById(notes, 3)).toBe('No note with this id');
  });
});

describe('addId service', () => {
  test('addId() returns new object with id', async () => {
    const idStore = path.join(
      __dirname,
      '..',
      '..',
      'db',
      'test',
      'idStoreTest.json'
    );

    const note = { name: 'abc' };

    const storeId = fs.readFileSync(idStore);
    const expectedId = JSON.parse(storeId).nextId.toString();

    const expectedNote = { name: 'abc', id: expectedId };

    const result = await addId(note, idStore);

    expect(result).toEqual(expectedNote);
  });
});

describe('updateProperties service', () => {
  test('updateProperties(notes, id, newProperties) returns new collection with updated object', async () => {
    const note1 = { id: 1, name: 'first' };
    const note2 = { id: 2, name: 'second' };

    const notes = [note1, note2];

    const newName = { name: 'no I am third' };

    const newNote = { id: 2, ...newName };

    const expected = {
      newNotes: [{ ...note1 }, { ...note2, ...newName }],
      updatedNote: newNote
    };

    expect(updateProperties(notes, 2, newName)).toEqual(expected);
  });
});

describe('deleteNoteById service', () => {
  test('deleteNoteById((notes, id) returns new collection without selected object', async () => {
    const note1 = { id: 1, name: 'first' };
    const note2 = { id: 2, name: 'second' };

    const notes = [note1, note2];

    const expected = [note1];

    expect(deleteNoteById(notes, 2)).toEqual(expected);
  });
});
