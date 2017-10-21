var socket = io();

    socket.on('connect',function() {
       
    })
   socket.on('disconnect', function() {
      console.log ('Disconnected from server');
   });

  socket.on('newMessage', function(mesg){
    console.log ('New Message',mesg);

  })