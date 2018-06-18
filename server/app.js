var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen('3001');

io.on('connection' , function (socket) {
    console.log('New User Has connected');

    socket.on('newMessage', function (message, room, userName, userEmail, userPhoto) {
        console.log(userName + ' send: ' + message + ' on ' + room + ' room');
        let data = [];
        data.push({
            userName: userName,
            userEmail: userEmail,
            userPhoto: userPhoto,
            msg: message,
            room: room
        });
        console.log(data);
        socket.to(room).emit('clientMessage' , data);
    });

    socket.on('joinRoom', function (room, userName, userEmail, userPhoto) {
        console.log(userName + ' join to room ' + room);
        let data = [];
        data.push({
            userName: userName,
            userEmail: userEmail,
            userPhoto: userPhoto,
            room: room
        });
        socket.join(room);
    });

    socket.on('leaveRoom', function (userName, userEmail, userPhoto, room) {
        console.log(userName + ' leave to room ' + room);
        let data = [];
        data.push({
            userName: userName,
            userEmail: userEmail,
            userPhoto: userPhoto,
            room: room
        });
        socket.leave(room);
    });

});
