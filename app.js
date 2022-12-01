/*
Group 01 codebase. 
*/
const express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//START OF ROUTES 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//END OF ROUTES
const app = express();
 
//START OF VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//END OF VIEW ENGINE SETUP

//START OF MIDDLE WARE 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//END OF MIDDLE WARE

//START OF ROUTES. 
app.use('/', indexRouter);
app.use('/home', indexRouter);
app.use('/signIn', indexRouter); 
app.use('/signUp', indexRouter); 
app.use('/addBlog', indexRouter); 
// END OF ROUTES.






// route to index and users.
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
