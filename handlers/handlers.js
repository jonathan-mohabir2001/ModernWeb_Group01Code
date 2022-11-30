exports.home =(req, res) => {
  res.render('home.pug')
}
// export the home pug file

exports.signUp=(req,res)=>{
  res.render('signUp.pug')
}
// export the signup pug file 

exports.login =(req,res) => {
  res.render('login.pug')
}
// export the login page 

exports.addBlog = (req,res)=>{
  res.render('addBlog.pug')
}
// export the add blog pug file