//this is a default nodejs package, later on we are using it to create a server;
const http = require("http");
//we are importing the express app
const app = require("./backend/app");
//this is package from node
const debug = require("debug")("node-angular");

///////////////////////////////////////////////////////////////////////////////////////////////
//this makes sure that the port number we get (for example from env...) is a valid number
const normalizePort = (val) => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

//checks which type of error occures
const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug("Listening on " + bind);
};

//////////////////////////////////////////////////////////////////////////////////////
//port now take the 3000 port-number or the port number that it gets after deploying
const port = normalizePort(process.env.PORT || "3000");
//app gets the port number and then the server is created
app.set("port", port);
const server = http.createServer(app);
//2 listener -->
//              - if there is an error
//              - if the server starts and begins to listen
server.on("error", onError);
server.on("listening", onListening);
//starts the server
server.listen(port);

//added a new script to start server:
//{"start:server": "nodemon server.js"}
