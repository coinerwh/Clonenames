const sock = io();
// sock.on('message', writeEvent);

sock.on('gamestate', writeEvent);

function writeEvent(state) {
    console.log(state);
    var gamestate = JSON.parse(state);
    assignCells(gamestate);
    assignScore(gamestate);
    assignTurn(gamestate);
};

function assignCells(gamestate) {
    var cells = document.getElementsByClassName('cell');
    for (x in cells) {
        
    }
}

function assignScore(gamestate) {

}

function assignTurn(gamestate) {

}

function cellListeners() {
    for (var i=1; i<26; i++){
        cell = 'cell' + i
        const button = document.getElementById(cell)
        button.addEventListener('click', (function (cell) {
            return function () {
                sock.emit('cellclick', cell);
            };
          }(cell)));
    }
}

function buttonListeners() {
    const turnbutton = document.getElementById('endturn');
    turnbutton.addEventListener('click', () => {
        sock.emit('button', 'endturn');
    });
    const newbutton = document.getElementById('new-game');
    newbutton.addEventListener('click', () => {
        sock.emit('button', 'new-game');
    });
}

cellListeners();
buttonListeners();

