var api = {};
global.api = api;
api.net = require('net');

var socket = new api.net.Socket();

socket.connect({
  port: 2000,
  host: '127.0.0.1',
}, function() {
    socket.on('data', function(data) {
        var results = JSON.parse(data).map(function (item) {
            return item * 2;
        });
        socket.write(JSON.stringify(results));
        console.log('Data received (by client): ' + data);
    });
});
