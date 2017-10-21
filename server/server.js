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
    socket.emit('newMessage', {
                from: 'admin',
                text: 'Welcome to chatbat',
                createdAt: new Date().getTime()
            });
    socket.broadcast.emit('newMessage', {
                from: 'admin',
                text: 'New user joins chatbat',
                createdAt: new Date().getTime()
            });
   
    socket.on('createMessage', (message) => {
        console.log("Create Message",message);
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })

        // socket.broadcast.emit('newMessage', {
        //         from: message.from,
        //         text: message.text,
        //         createdAt: new Date().getTime()
        //     })

    });
    socket.on('disconnect', () => {
    console.log ('Disconnected from server');
 });
});
 
server.listen(port, () =>{ console.log(`Starting server on port ${port}`);});
