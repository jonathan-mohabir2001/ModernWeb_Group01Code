exports.home =(req, res) => {
  res.render('home.pug')
}
// export the home pug file (home is an arrow function of handelrs.js)

exports.signUp=(req,res)=>{
  res.render('signUp.pug')
}
// export the signup pug file (signUp is an arrow function of handelrs.js)

exports.login =(req,res) => {
  res.render('login.pug')
}
// export the login page ( login is an arrow function of handelrs.js)

exports.addBlog = (req,res)=>{
  res.render('addBlog.pug') 
}
// export the add blog pug file (addBlog is an arrow function of handelrs.js)