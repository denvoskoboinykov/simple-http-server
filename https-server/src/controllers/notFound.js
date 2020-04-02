const notFound = res => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.write('<h1>Your path/method is invalid</h1>');
  res.end();
};

module.exports = notFound;
