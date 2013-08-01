var app = require('express')()
  , server = require('http').createServer(app)
  , passport = require('passport')
  , express = require('express')
  // , fs = require('fs')
  // , privateKey  = fs.readFileSync(__dirname + '/cert/privatekey.pem').toString()
  // , certificate = fs.readFileSync(__dirname + '/cert/certificate.pem').toString()
  // , credentials = {key: privateKey, cert: certificate}
  // , http = require('http')
  // , https = require('https')
  , env = process.env.NODE_ENV || 'development'
  , io = require('socket.io').listen(server)

  //, express = require('express')
 // , mongoProxy = require('./lib/mongo-proxy')
  , config = require('./config/config.js')[env]
  
  // , security = require('./lib/security')
  // , xsrf = require('./lib/xsrf')
  //, protectJSON = require('./lib/protectJSON');
;

// bootstrap passport config
require('./config/passport')(passport, config)


// var app = express();
// var secureServer = https.createServer(credentials, app);
// var server = http.createServer(app);

// bootstrap express config
//require('express-namespace');
require('./config/express')(app, passport, config)
  
// bootstrap routes
require('./config/routes')(app, passport, io);


// A standard error handler - it picks up any left over errors and returns a nicely formatted server 500 error
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// Start up the server on the port specified in the config
server.listen(config.server.listenPort, 'localhost', 511, function() {
  console.log('Server - listening on port: ' + config.server.listenPort);
});


//secureServer.listen(config.server.securePort);
console.log('AServer - listening on secure port: ' + config.server.securePort);
