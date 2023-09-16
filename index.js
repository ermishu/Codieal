const express = require('express');
const port = 3000;
const app = express();
const expressLayouts = require('express-ejs-layouts')
const db =require('./config/mongoose')

// use static file 
app.use(express.static('./assets'))

// use layout library to add Layout in Views 
app.use(expressLayouts);

// extract style and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes'))

//set up the view engine
app.set('view engine','ejs')
app.set('views',['./views','./views/home','./views/login','./views/profile'])


app.listen(port, (err) => {
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});