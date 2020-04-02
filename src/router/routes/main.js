const mainRoute = (req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.write('<h1>Yeah Science, $####!</h1>');
  res.end();
};

module.exports = mainRoute;
