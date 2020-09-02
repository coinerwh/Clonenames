const sock = io();
// sock.on('message', writeEvent);

var gameState = {};
var playerType = 'player';

sock.on('gamestate', writeEvent);

// handles response from server and updates game board
function writeEvent(state) {
    var gamestate = JSON.parse(state);
    gameState = gamestate;
    console.log(gameState);
    assignCells(gamestate);
    assignScore(gamestate);
    assignTurn(gamestate);
    if (playerType == 'player') {
        playerDisplay();
    } else {
        spymasterDisplay();
    }
};

function assignCells(gamestate) {
    var cells = document.getElementsByClassName('cell');
    var cellword = gamestate['cells'];
    for (var i=0; i<25; i++) {
        cells[i].textContent = cellword['cell'+(i+1)][0];
    }
}

function assignScore(gamestate) {
    var score = document.getElementById('score');
    var points = gamestate['points']
    score.textContent = points[0] + "-" + points[1];
}

function assignTurn(gamestate) {
    var turnDiv = document.getElementById('status');
    var turn = gamestate['turn'];
    var winner = gamestate['winner'];
    if (winner == 'None') {
        turnDiv.textContent = turn + "'s turn";
    } else {
        turnDiv.textContent = winner + " wins!";
    }
}

function spymasterDisplay() {
    var cells = document.getElementsByClassName('cell');
    // element.classList.add("my-class");
    var cellword = gameState['cells'];
    for (var i=0; i<25; i++) {
        if (cellword['cell'+(i+1)][1] == 'Blue') {
            cells[i].style.color = '#4183cc';
        } else if (cellword['cell'+(i+1)][1] == 'Red') {
            cells[i].style.color = '#d13030';
        }
        if (cellword['cell'+(i+1)][2] == false) {
            cells[i].classList.add("hidden");
        } else {
            cells[i].classList.remove("hidden");
            cells[i].style.color = null;
            if (cellword['cell'+(i+1)][1] == 'Blue'){
                cells[i].classList.add("blue");
            } else if (cellword['cell'+(i+1)][1] == 'Red') {
                cells[i].classList.add("red");
            } else {
                // placeholder for assassin
            }
        }
    }
}

function playerDisplay() {
    // displayer for player
}

// Sets event listeners for game cards
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

// sets eventlisteners end turn and new game buttons
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

// sets eventlisteners for player and spymaster buttons
function spyPlayerButtonListeners() {
    const playerButton = document.getElementById('player');
    const spymasterButton = document.getElementById('spymaster');
    playerButton.addEventListener('click', () => {
        playerType = 'player';
        playerDisplay();
    });
    spymasterButton.addEventListener('click', () => {
        playerType = 'spymaster';
        spymasterDisplay();
    });
}

cellListeners();
buttonListeners();
spyPlayerButtonListeners();

