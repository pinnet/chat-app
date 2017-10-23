const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require("./utils/valadation");

const pubPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(pubPath));

io.on('connection', (socket) => {
    console.log('Socket:connect');
    
    
    socket.on('join', (params,callback) =>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('name and room name are required');
        }
        socket.join(params.room);
        socket.emit('newMessage', generateMessage('Admin',`Welcome to ${params.room}`));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`A ${params.name} joins ${params.room}`));
        callback();
    });
   
    socket.on('createMessage', (message,callback) => {
        console.log("Create Message",message);
        callback();
        io.emit('newMessage', generateMessage(message.from,message.text));
    });
    
    socket.on('createLocationMessage', (coords)  => {  //,callback) => {
        //callback();
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });


    socket.on('disconnect', () => {
    console.log ('Disconnected from server');
 });
});
 
server.listen(port, () =>{ console.log(`Starting server on port ${port}`);});
