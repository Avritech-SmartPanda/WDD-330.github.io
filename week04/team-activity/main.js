let player = "X";
const board = document.getElementById('game');
board.addEventListener('click', markSquare);
const cells = document.querySelectorAll('.box');
const drawMessage = () => `Game ended in a draw!`;
handlePlayerChange()



// Put accordingly value X or O depending on players turn
function markSquare() {
    if (event.target.innerHTML == "" && player == "X") {
        event.target.innerHTML = player;
        player = "O";
        checkWin();

    } else {
        event.target.innerHTML = player;
        player = "X";
        checkWin();
    }
}

// Check turn of the player 
function handlePlayerChange() {
    document.getElementById('print').innerHTML = `It's ${player}'s turn`;
}

// Function to reset game
function resetBoard() {
    location.reload();
    cells.forEach(cell => {
        cell.innerHTML = "";
    });
}
//Function to restart game
function restart() {
    setTimeout(() => {
        resetBoard()
    },1000);
};

// Function called whenever user tab on any box
function checkWin() {
    // Setting DOM to all boxes.
    var box1, box1, box3, box4, box5, box6, box7, box8, box9;
    box1 = cells[0].innerHTML;
    box2 = cells[1].innerHTML;
    box3 = cells[2].innerHTML;
    box4 = cells[3].innerHTML;
    box5 = cells[4].innerHTML;
    box6 = cells[5].innerHTML;
    box7 = cells[6].innerHTML;
    box8 = cells[7].innerHTML;
    box9 = cells[8].innerHTML;
    handlePlayerChange();
    // Checking if Player won or not.
    // [0, 1, 2]
    if ((box1 == 'X') && (box2 == 'X') && (box3 == 'X')) {
        document.getElementById('print').innerHTML = "Player X has won up to top";
        restart();

    } else if ((box1 == 'O') && (box2 == 'O') && (box3 == 'O')) {
        document.getElementById('print').innerHTML = "Player X has won up to top";
        restart();
    }


    // [3, 4, 5]
    if ((box4 == 'X') && (box5 == 'X') && (box6 == 'X')) {
        document.getElementById('print').innerHTML = "Player X has won horizontally on the middle ";
        restart();
    } else if ((box4 == 'O') && (box5 == 'O') && (box6 == 'O')) {
        document.getElementById('print').innerHTML = "Player X has won horizontally on the middle";
        restart();
    }

    // [6, 7, 8]
    if ((box7 == 'X') && (box8 == 'X') && (box9 == 'X')) {
        document.getElementById('print').innerHTML = "Player X has won on the bottom";
        restart();
    } else if ((box7 == 'O') && (box8 == 'O') && (box9 == 'O')) {
        document.getElementById('print').innerHTML = "Player O has won on the bottom";
        restart();
    }

    // [0, 3, 6]
    if ((box1 == 'X') && (box4 == 'X') && (box7 == 'X')) {
        document.getElementById('print').innerHTML = "Player X has won on the left";
        restart();
    } else if ((box1 == 'O') && (box4 == 'O') && (box7 == 'O')) {
        document.getElementById('print').innerHTML = "Player O has won on the left";
        restart();
    }

    // [1, 4, 7]
    if ((box2 == 'X') && (box5 == 'X') && (box8 == 'X')) {
        document.getElementById('print').innerHTML = "Player X has won vertically on middle";
        restart();
    } else if ((box2 == 'O') && (box5 == 'O') && (box8 == 'O')) {
        document.getElementById('print').innerHTML = "Player O has won vertically on middle";
        restart();
    }

    // [2, 5, 8]
    if ((box3 == 'X') && (box6 == 'X') && (box9 == 'X')) {
        document.getElementById('print').innerHTML = "Player X has won on the right";
        restart();
    } else if ((box3 == 'O') && (box6 == 'O') && (box9 == 'O')) {
        document.getElementById('print').innerHTML = "Player O has won on the right";
        restart();
    }

    // [0, 4, 8]
    if ((box1 == 'X') && (box5 == 'X') && (box9 == 'X')) {
        document.getElementById('print').innerHTML = "Player X has won diagonally";
        restart();
    } else if ((box1 == 'O') && (box5 == 'O') && (box9 == 'O')) {
        document.getElementById('print').innerHTML = "Player O has won diagonally";
        restart();
    }

    // [2, 4, 6]
    if ((box3 == 'X') && (box5 == 'X') && (box7 == 'X')) {
        document.getElementById('print').innerHTML = "Player X has won diagonally";
        restart();
    } else if ((box3 == 'O') && (box5 == 'O') && (box7 == 'O')) {
        document.getElementById('print').innerHTML = "Player O has won diagonally";
        restart();
    }

    // Checking for a Tie
    if ((box1 == 'X' || box1 == 'O') && (box2 == 'X' || box2 == 'O') && (box3 == 'X' || box3 == 'O') &&
        (box4 == 'X' || box4 == 'O') && (box5 == 'X' || box5 == 'O') && (box6 == 'X' || box6 == 'O') &&
        (box7 == 'X' || box7 == 'O') && (box8 == 'X' || box8 == 'O') && (box9 == 'X' || box9 == 'O')) {
        document.getElementById('print').innerHTML = drawMessage();
        restart();
    }
}