const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const pubPath = path.join(__dirname,'../public');
const express = require('express');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(pubPath));

io.on('connection', (socket) => {
    console.log('Socket:connect');
  
    socket.emit('newMessage',{
        from: 'danny@dannyarnold.com',
        text: 'WTF',
        createAt: 1234566778
    });
    socket.on('createMessage', (newMessage) => {
        console.log("Create Message",newMessage);
    });
    socket.on('disconnect', () => {
    console.log ('Disconnected from server');
 });
});
 
server.listen(port, () =>{ console.log(`Starting server on port ${port}`);});
