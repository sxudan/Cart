"use strict";
const fs = require('fs');
const ip = require('ip');
const buffer = require('buffer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

var i = 0;
var trials = 0;

let WebSocketServer = require('ws').Server;
let port = 5080;
let wsServer = new WebSocketServer({
    port: port
});

var b = Buffer.from([0, 0, 0, 1])

console.log('websocket server start.' + ' ipaddress = ' + ip.address() + ' port = ' + port);

// fs.writeFile('audio.aac',"", 'latin1', function(err) {

// })

var clients = []

wsServer.on('connection', function(ws, req) {

    console.log("Client connected")
    i = 0;
    trials = 0;

    ws.id = id();
    clients.push(ws)

    // console.log(clients)

    ws.on('message', function(message) {
        console.log('-- message recieved -- ' + message.length);
        // fs.appendFile('audio.aac', message,'latin1', function (err) {
        //     if (err) throw err;
        //     // ffmpeg(
        // });
        clients.forEach(function(client) {
            if (!isSame(ws, client)) {
                console.log("")
                client.send(message)
            } else {
                console.log("skip")
            }
        })

    });

    ws.on('close', function() {

    })

});

function isSame(ws1, ws2) {
    // -- compare object --
    return (ws1.id === ws2.id);
}

// generate a 4 digit hex code randomly
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// make a REALLY COMPLICATED AND RANDOM id, kudos to dennis
function id() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
