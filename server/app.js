var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen('3001');

io.on('connection' , function (socket) {
    console.log('New User Has connected');

    socket.on('newMessage', function (message, room, user) {
        console.log(user + ' send: ' + message + ' on ' + room + ' room');
        let data = [];
        data.push({
            user: user,
            msg: message,
            room: room
        });
        socket.to(room).emit('clientMessage' , data);
    });

    socket.on('joinRoom', function (room, user) {
        console.log(user + ' join to room ' + room);
        let data = [];
        data.push({
            user: user,
            room: room
        });
        socket.join(room);
    });

    socket.on('leaveRoom', function (user, room) {
        console.log(user + ' leave to room ' + room);
        let data = [];
        data.push({
            user: user,
            room: room
        });
        socket.leave(room);
    });

});
