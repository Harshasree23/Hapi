const express = require('express');
const path = require('path');
const { apiRoute } = require('./routes/api');
const { userRoute } = require('./routes/user');
const { makeConnection } = require('./connectToDb.js');
const portfinder = require('portfinder');

// Creating app
const app = express();


// connect to DB
makeConnection('my_server').then( () => console.log('connected to DB') );


// middleWare
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.urlencoded( { extended : false } ));
app.use(express.json());
app.use("/public", express.static('public')); 

// Routes
app.use('/api',apiRoute);
app.use('/user',userRoute);

// connect
portfinder.basePort = 3000; // Starting port
portfinder.getPort((err, port) => {
  if (err) {
    console.error('Error finding a free port:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
});