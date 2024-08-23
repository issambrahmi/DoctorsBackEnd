// Librairies
const express = require('express');
const http = require('http');

// Routes
const HomeRoute = require('./Routes/home');
const searchRoute = require('./Routes/search');
const appoinetementRoute = require('./Routes/appoinetement');



//Midllewares
const app = express();

// define routes
app.use('/Home' , HomeRoute);
app.use('/Search' , searchRoute);
app.use('/Appoinetement' , appoinetementRoute);



app.listen(3000 , ()=>{
    console.log('app listen on port 3000');
})




