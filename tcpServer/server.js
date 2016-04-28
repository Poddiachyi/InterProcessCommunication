var api = {};
global.api = api;
api.net = require('net');
api.os = require('os');

var cpuCount = api.os.cpus().length;
var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11, 18, 21];
var taskLength = task.length / cpuCount;

var result = [];
var results = [];
var clients = [];
var indexOf = {};


var server = api.net.createServer(function(socket) {

    if (clients.length == cpuCount) {
        console.log("Restarting");
        restart();
    }

    clients.push(socket);
    indexOf[socket] = clients.length;

    var beginning = taskLength * (clients.length - 1);
    socket.write(JSON.stringify(task.slice(beginning, beginning  + taskLength)));

    socket.on('data', function(data) {
        console.log('Data received (by server)'  + data);
        results[indexOf[socket]] = JSON.parse(data);
        recalculateResult();
        console.log("Current result: " + result);
    });
}).listen(2000);

function recalculateResult(){
    result = [];
    results.forEach(function (res){
        result = result.concat(res);
    });
}

function restart(){
    task = result;
    result = [];
    results = [];
    clients = [];
    indexOf = {};
}
