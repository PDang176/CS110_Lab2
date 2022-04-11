// Dictates which player's turn it is (0 = X, 1 = O)
const players = ['X', 'O'];
var currentPlayer = 0;

// Scores of Players [X, O]
var scores = [0, 0];

// Arrays for the moves X and O make
var movesX = [];
var movesO = [];

const winConditions = [[0, 1, 2],
                       [3, 4, 5],
                       [6, 7, 8],
                       [0, 3, 6],
                       [1, 4, 7],
                       [2, 5, 8],
                       [0, 4, 8],
                       [2, 4, 6]];

// Reset the board to an empty state
function newGame(nodes){
    for(let i = 0; i < nodes.length; i++){
        nodes[i].classList.remove('disabled');
        nodes[i].firstChild.innerHTML = '';
        currentPlayer = 0;
        movesX = [];
        movesO = [];
    }
}

// Record the move of the current player
function recordMove(i){
    if(currentPlayer){
        movesO.push(i);
    }
    else{
        movesX.push(i);
    }
}

// Checks to see if there is a winner
function checkWinner(){
    // 9 moves have been made
    if(movesX.length + movesO.length >= 9){
        return false;
    }

    // Check every possible combination of win conditions for the current player
    for(let i = 0; i < winConditions.length; i++){
        if(winConditions[i].every(winCondition => {
            if(currentPlayer){
                return movesO.includes(winCondition);
            }
            else{
                return movesX.includes(winCondition);
            }
        })){
            return true;
        }
    }

    return false;
}

function documentScores(){
    document.getElementById('scoreX').innerHTML = scores[0];
    document.getElementById('scoreO').innerHTML = scores[1];
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('display_player').innerHTML = players[currentPlayer];

    var nodes = document.getElementsByClassName('node');

    for(let i = 0; i < nodes.length; i++){
        nodes[i].addEventListener('click', function(){
            this.classList.add('disabled');
            this.firstChild.innerHTML = players[currentPlayer];

            recordMove(i);
            if(checkWinner()){
                console.log(players[currentPlayer] + " is the winner!");
                scores[currentPlayer]++;
                documentScores();
            }
            
            currentPlayer = currentPlayer ? 0 : 1;
        });
    }

    document.getElementById('new_game').addEventListener('click', function(){
        newGame(nodes);
    });

    document.getElementById('reset').addEventListener('click', function(){
        newGame(nodes);
        scores[0] = 0;
        scores[1] = 0;
        documentScores();
    });
});