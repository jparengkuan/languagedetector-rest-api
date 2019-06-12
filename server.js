const http = require('http');

const port =  process.env.PORT || 8080;

const server = http.createServer();

//start the server with the port as argument
server.listen(port);
