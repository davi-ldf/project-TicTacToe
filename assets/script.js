// Initial Data
let square = { //Square representation
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''

};
let player = ''; //Whose turn is it
let warning = ''; //Who won
let playing = false; //If the game is running

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(playing === true && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer(); //Alterna player
    }
}

function reset() { //Clear all
    warning = ''; //Clear the warning

    let random = Math.floor(Math.random() * 2);
    //Generate a random number between 0 and 1.

    if(random === 0) {
        player = 'x';
    } else {
        player = 'o';
    }
    //player = (random === 0) ? 'x' : 'o';
    //Choose if you are 'X' or 'O'.

    for(let i in square) {
        square[i] = '';
        //Clear all items of the square's Object.
    }

    playing = true; //Start the game

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`); //Catch all square items, one by one.
        item.innerHTML = square[i];
        //fill item's HTML
    }

    checkGame();
}

function renderInfo() { //Render Player & Warning info on HTML
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    if(player === 'x') {
        player = 'o';
        renderInfo();
    } else {
        player = 'x';
        renderInfo();
    };
}

function checkGame() { //Check if someone won;
    if(checkWinnerFor('x')) {
        warning = '"X" won';
        playing = false;
    } else if (checkWinnerFor('o')) {
        warning = '"O" won';
        playing = false;
    } else if (isFull()) {
        warning = 'The game tied';
        playing = false;
    }
}

function checkWinnerFor(player) {
    let pos = [ //All possibilities for win
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(','); //a1, a2, a3
        let hasWon = pArray.every(option => square[option] === player);
        if(hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }

    return true;
}