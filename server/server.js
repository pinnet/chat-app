const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require("./utils/valadation");
const {Users} = require('./utils/users');

const pubPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(pubPath));

io.on('connection', (socket) => {
    
    socket.on('join', (params,callback) =>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUsersList(params.room));

        socket.emit('newMessage', generateMessage('Admin',`Welcome to ${params.room}`));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`A ${params.name} joins ${params.room}`));
        callback();
    });
    socket.on('createMessage', (message,callback) => {
       
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));
        }
        callback();
    });
    socket.on('createLocationMessage', (coords)  => { 
        var user = users.getUser(socket.id);
        if (user){
        
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude,coords.longitude));
        }
    });
    socket.on('disconnect', () => {
  
        var user = users.removeUser(socket.id);
        io.to(user.room).emit('updateUserList',users.getUsersList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left the room`));
   });
});
 
server.listen(port, () =>{ console.log(`Starting server on port ${port}`);});
