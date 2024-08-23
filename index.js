const express = require('express');
const path = require('path');
const { apiRoute } = require('./routes/api');
const { userRoute } = require('./routes/user');
const { makeConnection } = require('./connectToDb.js');


// Creating app
const app = express();
const PORT = 8000;


// connect to DB
makeConnection('my_server').then( () => console.log('connected to DB') );


// middleWare
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.urlencoded( { extended : false } ));
app.use(express.json());


// Routes
app.use('/api',apiRoute);
app.use('/user',userRoute);

// connect
app.listen(8000, 
    () => console.log(`server started at port ${PORT}`)
)