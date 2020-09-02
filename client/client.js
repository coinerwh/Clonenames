// const { userInfo } = require("os");

const sock = io();

var gameState = {};
var playerType = 'player';
var cells = document.getElementsByClassName('cell');
var favicon = document.getElementById("favicon");

sock.on('gamestate', writeEvent);

// handles response from server and updates game board
function writeEvent(state) {
    var gamestate = JSON.parse(state);
    gameState = gamestate;
    assignCells(gamestate);
    assignScore(gamestate);
    assignTurn(gamestate);
    console.log(state);
    if (playerType == 'player') {
        playerDisplay();
    } else {
        spymasterDisplay();
    }
    if (gamestate['winner'] != 'None') {
        spymasterDisplay();
    }
};

function assignCells(gamestate) {
    var cellword = gamestate['cells'];
    for (var i=0; i<25; i++) {
        cells[i].textContent = cellword['cell'+(i+1)][0];
    }
}

function assignScore(gamestate) {
    var bluescore = document.getElementById('bluescore');
    var redscore = document.getElementById('redscore');
    var points = gamestate['points'];
    bluescore.textContent = points[0];
    redscore.textContent = points[1];
}

function assignTurn(gamestate) {
    var turnDiv = document.getElementById('status');
    var turn = gamestate['turn'];
    var winner = gamestate['winner'];
    if (winner == 'None') {
        turnDiv.textContent = turn + "'s turn";
        turnDiv.className = '';
        if (turn == 'Blue') {
            favicon.setAttribute('href','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAmSURBVHgB7cxBAQAABATBo5ls6ulEiPt47ASYqJ6VIWUiICD4Ehyi7wKv/xtOewAAAABJRU5ErkJggg==');
            turnDiv.classList.add('blueturn');
        } else {
            favicon.setAttribute('href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAmSURBVHgB7cwxAQAACMOwgaL5d4EiELGHoxGQGnsVaIUICAi+BAci2gJQFUhklQAAAABJRU5ErkJggg==');
            turnDiv.classList.add('redturn');
        }
    } else {
        setWinner(turnDiv, winner);
    }
}

function setWinner(turnDiv, winner) {
    turnDiv.className = '';
    turnDiv.textContent = winner + " wins!";
    if (winner == 'Blue') {
        favicon.setAttribute('href','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAmSURBVHgB7cxBAQAABATBo5ls6ulEiPt47ASYqJ6VIWUiICD4Ehyi7wKv/xtOewAAAABJRU5ErkJggg==');
        turnDiv.classList.add('blueturn');
    } else {
        favicon.setAttribute('href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAmSURBVHgB7cwxAQAACMOwgaL5d4EiELGHoxGQGnsVaIUICAi+BAci2gJQFUhklQAAAABJRU5ErkJggg==');
        turnDiv.classList.add('redturn');
    }
}

// set display for spymaster
function spymasterDisplay() {
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
                cells[i].classList.add("assassin");
            }
        }
    }
}

// set display for player
function playerDisplay() {
    var cellword = gameState['cells'];
    for (var i=0; i<25; i++) {
        cells[i].style.color = null;
        cells[i].classList.remove('blue');
        cells[i].classList.remove('red');
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
                cells[i].classList.add("assassin");
            }
        }
    }
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



