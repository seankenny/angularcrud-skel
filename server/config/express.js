var express = require('express')
  , path = require('path')
  , csrf = require('./csrf')()
  , protectJSON = require('../lib/protectJSON')
  , xsrf = require('../lib/xsrf');

module.exports = function(app, passport, config){
  
  // Serve up the favicon
  app.use(express.favicon(config.server.distFolder + '/favicon.ico'));

  // // First looks for a static file: index.html, css, images, etc.
  app.use(config.server.staticUrl, express.compress());
  app.use(config.server.staticUrl, express['static'](config.server.distFolder));
  app.use(config.server.staticUrl, function(req, res, next) {
    res.send(404); // If we get here then the request for a static file is invalid
  });

  //app.use(protectJSON);

  app.use(express.logger());                                  // Log requests to the console
  app.use(express.bodyParser());                              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
  //app.use(express.cookieParser(config.server.cookieSecret));  // Hash cookies with this secret
  //app.use(express.cookieSession());                           // Store the session in the (secret) cookie
  app.use(passport.initialize());                             // Initialize PassportJS
  app.use(passport.session());                                // Use Passport's session authentication strategy - this stores the logged in user in the session and will now run on any request
  //app.use(xsrf);                                            // Add XSRF checks to the request
  //security.initialize(config.mongo.dbUrl, config.mongo.apiKey, config.security.dbName, config.security.usersCollection); // Add a Mongo strategy for handling the authentication

  app.use(function(req, res, next) {
    if ( req.user ) {
      console.log('Current User:', req.user.firstName, req.user.lastName);
    } else {
      console.log('Unauthenticated');
    }
    next();
  });

}