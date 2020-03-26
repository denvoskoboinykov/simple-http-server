const https = require('https');
const fs = require('fs');
const url = require('url');
const router = require('./router/router');
const { port, datebasePath, storeIdPath } = require('./config/config');

const getPath = url => url.split('/')[1];

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

    // =============
    // const a = '1,2,3,4\na,b,c,d\n11,22,33,44\n';
    // fs.writeFileSync('./db/file.csv', a);
    // res.end('done');
  })
  .listen(port);
