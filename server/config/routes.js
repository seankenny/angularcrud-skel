var express = require('express')
  , path = require('path')
  , security = require('../lib/security')
  , csrf = require('./csrf')();

module.exports = function(app, passport, config){
  //require('express-namespace');
  // app.namespace('/databases/:db/collections/:collection*', function() {
  //   app.all('/', function(req, res, next) {
  //     if ( req.method !== 'GET' ) {
  //       // We require the user is authenticated to modify any collections
  //       security.authenticationRequired(req, res, next);
  //     } else {
  //       next();
  //     }
  //   });
  //   app.all('/', function(req, res, next) {
  //     if ( req.method !== 'GET' && (req.params.collection === 'users' || req.params.collection === 'projects') ) {
  //       // We require the current user to be admin to modify the users or projects collection
  //       return security.adminRequired(req, res, next);
  //     }
  //     next();
  //   });
  //   // Proxy database calls to the MongoDB
  //   //app.all('/', mongoProxy(config.mongo.dbUrl, config.mongo.apiKey));
  // });

  app.post('/login', security.login);
  app.post('/logout', security.logout);

  // Retrieve the current user
  app.get('/current-user', security.sendCurrentUser);

  // Retrieve the current user only if they are authenticated
  app.get('/authenticated-user', function(req, res) {
    security.authenticationRequired(req, res, function() { security.sendCurrentUser(req, res); });
  });

  // Retrieve the current user only if they are admin
  app.get('/admin-user', function(req, res) {
    security.adminRequired(req, res, function() { security.sendCurrentUser(req, res); });
  });

  // This route deals enables HTML5Mode by forwarding missing files to the index.html
  app.all('/*', function(req, res) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendfile('index.html', { root: config.server.distFolder });
  });
}