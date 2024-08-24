// Librairies
const express = require('express');
const http = require('http');
const path = require('path');

// Routes
const HomeRoute = require('./Routes/home');
const searchRoute = require('./Routes/search');
const appoinetementRoute = require('./Routes/appoinetement');



//Midllewares
const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connect' , (socket) => {
  console.log('new user connected');
  socket.on('addNewMsg' , () => {
  });
});

app.get('/' , (req ,res) =>{
    res.sendFile(path.join(__dirname , 'View/io.html'));
});

// define routes
app.use('/home' , HomeRoute);
app.use('/search' , searchRoute);
app.use('/appoinetement' , appoinetementRoute);



server.listen(3000 , ()=>{
    console.log('app listen on port 3000');
})




