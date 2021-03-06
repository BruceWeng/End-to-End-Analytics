var express = require('express');
var path = require('path');
var http = require('http');
var routes = require('./routes');
var user = require('./routes/user');
var mongoose = require('mongoose');

var app = express();

// view engine setup
app.configure(function() {
  app.set('port', process.env.PORT || 3000);

  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').__express);
  app.set('view engine', 'html');

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', routes.index);
// app.get('/users', user.list);

// Connect to mongo and then start server
function connectToMongo(callback) {

  mongoose.connect('mongodb://localhost/analytics');
  mongoose.connection.on('open', function() {

    console.log('Connected to mongodb://localhost/analytics');
    callback();
  });
}

connectToMongo(function() {

  app.listen(app.get('port'), function() {

    console.log("Express server listening on port " + app.get('port'));
  });
});

