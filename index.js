const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000; 
// default port set to 8000, app set, express imported. 
const path = require('path')
const fs = require('fs')
// path and file system modules imported. 


// helllo ooos


//new new new new 

app.get('/', (req, res )=>{
  res.send('hello')
})


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
// this sets our app to be able to render any pug files we need to make 





app.listen(PORT, () => {
  console.log(`Server started on ${PORT}, press ctrl+c to end`)
})
// listener statement. 
