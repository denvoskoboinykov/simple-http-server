const https = require('https');
const fs = require('fs');
const url = require('url');
const router = require('./router/router');
const { getPath } = require('./helpers/helpers');
const { port, datebasePath, storeIdPath } = require('./config/config');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https
  .createServer(options, (req, res) => {
    const parsedUrl = url.parse(req.url);
    const path = getPath(parsedUrl.pathname);

    const routerGet = router[path] || router.default;

    routerGet(req, res, datebasePath, storeIdPath);
  })
  .listen(port);
