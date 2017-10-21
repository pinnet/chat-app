const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage} = require('./utils/message');
const pubPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(pubPath));

io.on('connection', (socket) => {
    console.log('Socket:connect');
    socket.emit('newMessage', generateMessage('Admin','Welcome to chatbat'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','A new user joins chatbat'));
   
    socket.on('createMessage', (message) => {
        console.log("Create Message",message);
        io.emit('newMessage', generateMessage(message.from,message.text));
    });
    socket.on('disconnect', () => {
    console.log ('Disconnected from server');
 });
});
 
server.listen(port, () =>{ console.log(`Starting server on port ${port}`);});
