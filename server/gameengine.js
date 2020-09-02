class CodenamesGame {

    constructor() {
        this.turn = 'Blue';
        this.cellSelectionNum = 0;
        this.winner = 'None';
        // blue index 0, red index 1
        this.points = [0, 0];
        this.usedIndices = [];
        this.cellCount = [1, 1, 0];
        this.cells = {}
        this.generateCells();
    }

    generateCells() {
        for (var i=1; i<26; i++) {
            this.cells['cell'+i] = []
            this.generateWord(i);
            this.generateTeam(i);
            this.cells['cell'+i].push(false);
        }
    }

    generateWord(num) {
        var index = Math.floor(Math.random() * 400);
        while (index in this.usedIndices) {
            index = Math.floor(Math.random() * 400);
        }
        this.usedIndices.push(index);
        this.cells['cell'+num][0] = wordList[index];
        
    }

    generateTeam(num) {
        var team = Math.floor(Math.random() * 3);
        if (team == 0 && this.cellCount[0] <= 12) {
            this.cells['cell'+num][1] = 'Blue';
            this.cellCount[0]++;
        } else if (team == 1 && this.cellCount[1] <= 12) {
            this.cells['cell'+num][1] = 'Red';
            this.cellCount[1]++;
        } else if (team == 2 && this.cellCount[2] < 1) {
            this.cells['cell'+num][1] = 'Assassin';
            this.cellCount[2]++;
        } else {
            this.generateTeam(num);
        }
    }

    updateCell(cell) {
        this.cells[cell][2] = true;
        this.updateTurn();
        this.updateScore(cell);
    }

    updateTurn() {
        this.cellSelectionNum++
        if (this.cellSelectionNum === 3 && this.turn == 'Blue') {
            this.turn = 'Red';
            this.cellSelectionNum = 0;
        } 
        else if (this.cellSelectionNum === 3 && this.turn == 'Red') {
            this.turn = 'Blue';
            this.cellSelectionNum = 0;
        }

    }

    updateScore(cell) {
        var team = this.cells[cell][1];
        if (team == 'Blue') {
            this.points[0]++;
            if (this.points[0] > 7) {
                this.winner = 'Blue';
            }
        } else{
            this.points[1]++;
            if (this.points[1] > 7) {
                this.winner = 'Red';
            }
        }
    }

    endTurn() {
        if (this.turn == 'Blue') {
            this.turn = 'Red';
        } else {
            this.turn = 'Blue';
        }
        this.cellSelectionNum == 0;
    }

    gameState() {
        var obj = {'turn': this.turn, 'winner': this.winner, 'points': this.points, 'cells': this.cells};
        var state = JSON.stringify(obj);
        return state
    }

     // reset game
     newGame() {
        this.turn = 'Blue';
        this.cellSelectionNum = 0;
        this.winner = 'None';
        this.points[0] = 0;
        this.points[1] = 0;
        this.usedIndices = [];
        this.cellCount[0] = 1;
        this.cellCount[1] = 1;
        this.cellCount[2] = 0;
        this.generateCells();
    }

}


const wordList = ["AFRICA", "AGENT", "AIR", "ALIEN", "ALPS", "AMAZON", "AMBULANCE", "AMERICA", "ANGEL", "ANTARCTICA", "APPLE", "ARM", "ATLANTIS", "AUSTRALIA", "AZTEC", "BACK", "BALL", "BAND", "BANK", "BAR", "BARK", "BAT", "BATTERY", "BEACH", "BEAR", "BEAT", "BED", "BEIJING", "BELL", "BELT", "BERLIN", "BERMUDA", "BERRY", "BILL", "BLOCK", "BOARD", "BOLT", "BOMB", "BOND", "BOOM", "BOOT", "BOTTLE", "BOW", "BOX", "BRIDGE", "BRUSH", "BUCK", "BUFFALO", "BUG", "BUGLE", "BUTTON", "CALF", "CANADA", "CAP", "CAPITAL", "CAR", "CARD", "CARROT", "CASINO", "CAST", "CAT", "CELL", "CENTAUR", "CENTER", "CHAIR", "CHANGE", "CHARGE", "CHECK", "CHEST", "CHICK", "CHINA", "CHOCOLATE", "CHURCH", "CIRCLE", "CLIFF", "CLOAK", "CLUB", "CODE", "COLD", "COMIC", "COMPOUND", "CONCERT", "CONDUCTOR", "CONTRACT", "COOK", "COPPER", "COTTON", "COURT", "COVER", "CRANE", "CRASH", "CRICKET", "CROSS", "CROWN", "CYCLE", "CZECH", "DANCE", "DATE", "DAY", "DEATH", "DECK", "DEGREE", "DIAMOND", "DICE", "DINOSAUR", "DISEASE", "DOCTOR", "DOG", "DRAFT", "DRAGON", "DRESS", "DRILL", "DROP", "DUCK", "DWARF", "EAGLE", "EGYPT", "EMBASSY", "ENGINE", "ENGLAND", "EUROPE", "EYE", "FACE", "FAIR", "FALL", "FAN", "FENCE", "FIELD", "FIGHTER", "FIGURE", "FILE", "FILM", "FIRE", "FISH", "FLUTE", "FLY", "FOOT", "FORCE", "FOREST", "FORK", "FRANCE", "GAME", "GAS", "GENIUS", "GERMANY", "GHOST", "GIANT", "GLASS", "GLOVE", "GOLD", "GRACE", "GRASS", "GREECE", "GREEN", "GROUND", "HAM", "HAND", "HAWK", "HEAD", "HEART", "HELICOPTER", "HIMALAYAS", "HOLE", "HOLLYWOOD", "HONEY", "HOOD", "HOOK", "HORN", "HORSE", "HORSESHOE", "HOSPITAL", "HOTEL", "ICE", "ICE CREAM", "INDIA", "IRON", "IVORY", "JACK", "JAM", "JET", "JUPITER", "KANGAROO", "KETCHUP", "KEY", "KID", "KING", "KIWI", "KNIFE", "KNIGHT", "LAB", "LAP", "LASER", "LAWYER", "LEAD", "LEMON", "LEPRECHAUN", "LIFE", "LIGHT", "LIMOUSINE", "LINE", "LINK", "LION", "LITTER", "LOCH NESS", "LOCK", "LOG", "LONDON", "LUCK", "MAIL", "MAMMOTH", "MAPLE", "MARBLE", "MARCH", "MASS", "MATCH", "MERCURY", "MEXICO", "MICROSCOPE", "MILLIONAIRE", "MINE", "MINT", "MISSILE", "MODEL", "MOLE", "MOON", "MOSCOW", "MOUNT", "MOUSE", "MOUTH", "MUG", "NAIL", "NEEDLE", "NET", "NEW YORK", "NIGHT", "NINJA", "NOTE", "NOVEL", "NURSE", "NUT", "OCTOPUS", "OIL", "OLIVE", "OLYMPUS", "OPERA", "ORANGE", "ORGAN", "PALM", "PAN", "PANTS", "PAPER", "PARACHUTE", "PARK", "PART", "PASS", "PASTE", "PENGUIN", "PHOENIX", "PIANO", "PIE", "PILOT", "PIN", "PIPE", "PIRATE", "PISTOL", "PIT", "PITCH", "PLANE", "PLASTIC", "PLATE", "PLATYPUS", "PLAY", "PLOT", "POINT", "POISON", "POLE", "POLICE", "POOL", "PORT", "POST", "POUND", "PRESS", "PRINCESS", "PUMPKIN", "PUPIL", "PYRAMID", "QUEEN", "RABBIT", "RACKET", "RAY", "REVOLUTION", "RING", "ROBIN", "ROBOT", "ROCK", "ROME", "ROOT", "ROSE", "ROULETTE", "ROUND", "ROW", "RULER", "SATELLITE", "SATURN", "SCALE", "SCHOOL", "SCIENTIST", "SCORPION", "SCREEN", "SCUBA DIVER", "SEAL", "SERVER", "SHADOW", "SHAKESPEARE", "SHARK", "SHIP", "SHOE", "SHOP", "SHOT", "SINK", "SKYSCRAPER", "SLIP", "SLUG", "SMUGGLER", "SNOW", "SNOWMAN", "SOCK", "SOLDIER", "SOUL", "SOUND", "SPACE", "SPELL", "SPIDER", "SPIKE", "SPINE", "SPOT", "SPRING", "SPY", "SQUARE", "STADIUM", "STAFF", "STAR", "STATE", "STICK", "STOCK", "STRAW", "STREAM", "STRIKE", "STRING", "SUB", "SUIT", "SUPERHERO", "SWING", "SWITCH", "TABLE", "TABLET", "TAG", "TAIL", "TAP", "TEACHER", "TELESCOPE", "TEMPLE", "THEATER", "THIEF", "THUMB", "TICK", "TIE", "TIME", "TOKYO", "TOOTH", "TORCH", "TOWER", "TRACK", "TRAIN", "TRIANGLE", "TRIP", "TRUNK", "TUBE", "TURKEY", "UNDERTAKER", "UNICORN", "VACUUM", "VAN", "VET", "WAKE", "WALL", "WAR", "WASHER", "WASHINGTON", "WATCH", "WATER", "WAVE", "WEB", "WELL", "WHALE", "WHIP", "WIND", "WITCH", "WORM", "YARD"]
module.exports = CodenamesGame;
