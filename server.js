var PORT = process.env.PORT || 3000;
var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('message', function (message) {
        console.log('message received:'+message.text);

        message.timestamp = moment().valueOf();
        io.emit('message', message);
    });

    socket.emit('message', {
        text: 'Hello World!',
        timestamp: moment().valueOf()
    });
})

http.listen(PORT, function () {
    console.log('listening on *:' + PORT);
});