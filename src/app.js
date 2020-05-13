const http = require('http');
const url = require('url');
const router = require('./router/router');
const { getPath } = require('./helpers');
const { port, datebasePath, storeIdPath } = require('./config');

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const path = getPath(parsedUrl.pathname);

    const routerGet = router[path] || router.default;

    routerGet(req, res, datebasePath, storeIdPath);
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
