var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('home', { title:'We are at the home.'})


});




/*
REMOVED THIS ROUTE, incorrect path, incorrect render 
router.get('/home', function(req, res, next) {
  res.render('home');
});
*/
router.get('/addBlog', function(req, res, next){
  res.render('addBlog')
});


module.exports = router;
