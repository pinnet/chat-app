var socket = io();

    socket.on('connect',function() {
      console.log('Connected');  
    })
   socket.on('disconnect', function() {
      console.log ('Disconnected from server');
   });

  socket.on('newMessage', function(mesg){
    console.log ('New Message',mesg);

  });

  socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hello'
  },function(){

    console.log('got hit');

  });