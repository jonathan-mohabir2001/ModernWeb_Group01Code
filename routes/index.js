var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('home', { title:'We are at the home.'})
});

//Code to ensure that we are logged in

function ensureIsLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
      res.redirect("/signIn");
  }
  else {
      next();
  }
}

/*Use this to check if we are logged in

  .get(ensureIsLoggedIn, (req, res) =>{
    //This is where you wrap the response 
  })

*/


/*
REMOVED THIS ROUTE, incorrect path, incorrect render 
router.get('/home', function(req, res, next) {
  res.render('home');
});
*/
router.route('/addBlog').get(ensureIsLoggedIn, (req, res, next) =>{
  res.render('addBlog')
});


module.exports = router;
