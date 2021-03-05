var express = require('express');
var db = require('./db');
var cors = require('cors');
//do we need to do something with db.connection inside this module?

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use(cors());

// Set up our routes
app.use('/classes', router);

// Serve the client files
app.use(express.static(__dirname + '/../client'));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

// Put all the pieces together to create a persistent SQL-backed chatterbox-server! Use server/app.js as the entrypoint into your application. You will have to build out the methods in server/models/index.js and server/controllers/index.js.

