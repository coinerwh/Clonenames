const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const path = require('path');

const CodenamesGame = require('./gameengine');

const app = express();

const clientPath = path.join(__dirname, '/../client');
console.log('Serving static from ',  clientPath);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

// initialize game engine 
var game = new CodenamesGame();

// initial connection
io.on('connection', function(sock){
    console.log("Someone connected.")
    var state = game.gameState();
    sock.emit('gamestate', state);

    //player clicks on cell
    sock.on('cellclick', function(data){
        game.updateCell(data);
        var state = game.gameState();
        io.sockets.emit('gamestate', state);
    });

    // player clicks game button
    sock.on('button', function(data) {
        if (data == 'new-game') {
            console.log("New game started.");
            game.newGame();
        } else {
            console.log("End of turn.")
            game.endTurn();
        }
        var state = game.gameState();
        io.sockets.emit('gamestate', state);
    });
});

// error
server.on('error', function(err){
    console.error("Server error", err);
});


server.listen(3000, function(){
    console.log("Codenames server started on 3000");
});



