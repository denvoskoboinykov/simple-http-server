const getPath = url => url.split('/')[1];

const getIdFromUrl = url => url.split('/')[2];

module.exports = { getPath, getIdFromUrl };
