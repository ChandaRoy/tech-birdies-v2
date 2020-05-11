var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// MongoClient.connect(urlString);
var mongoose = require('mongoose');
var RedisStore = require('connect-redis')(session);
var app = express();
//mongoose.connect(process.env.MONGODB_URL||'mongodb://localhost/limber');
mongoose.connect('mongodb://dev:chanda20@ds153719.mlab.com:53719/mydb20');
var routes = require('./Server/routes/index');
//var users = require('./routes/users');
var user = require('./Server/routes/user');
// var github-api=require('./routes/github-api.js');
var authenticationHandler = require('./Server/routes/authenticationHandler')(passport);
var postContent = require('./Server/routes/postContent');
app.use(session({
  store: new RedisStore({
    host: process.env.REDIS_HOST||'127.0.0.1',
    port: process.env.REDIS_PORT||6379,
    db: 7
  }),

  secret:process.env.REDIS_SECRET||'fragile'
}));

var initPassport = require('./Server/passport-init');
initPassport(passport);

//
//Add socket.js link here
//
app.use(express.static(path.join(__dirname, 'dist/tech-bidies-app-v2')));
app.use(express.static(path.join(__dirname, 'uploads')));
console.log((path.join(__dirname, 'uploads')));

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'authFolder')));
app.use('/', routes);
app.use('/auth',authenticationHandler);
app.use('/content',postContent);


// view engine setup

app.use(function(req, res, next) {
  if (req.isAuthenticated())
  {
    return next();
  }
  else
  {
    return res.redirect('');
  }
});



// app.use('/', express.static(__dirname + '/dist/tech-bidies-app-v2'));




app.set('views', path.join(__dirname, 'Server/views'));
app.set('view engine', 'ejs');

// app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', user);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
   res.render('error', {
   message: err.message,
    error: {}
 });
});

module.exports = app;
