const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./mock/mock.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 7000;


server.use(jsonServer.bodyParser);
server.use(function (req, res, next) {
  if (req.method === 'POST') {
    // Converts POST to GET and move payload to query params
    // This way it will make JSON Server that it's GET request
    req.method = 'GET'
    req.query = req.body
  }
  // Continue to JSON Server router
  next()
})

server.use(jsonServer.rewriter({
  '/apps/dias/*/access': '/access',
  '/apps/dias/*/overview?goAhead=NO': '/overview'

}));
server.use(middlewares);
server.use(router);
server.listen(port);