const express = require('express');
const port = 3000;
const app = express();

//use express router
app.use('/',require('./routes'))

//set up the view engine
app.set('view engine','ejs')
app.set('views','./views')


app.listen(port, (err) => {
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port : ${port}`);
});