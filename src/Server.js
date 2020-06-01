const http = require("http");
const routes = require("./Routes");

const port = process.env.PORT || 3333;

const server = http.createServer(routes);

server.listen(port);
