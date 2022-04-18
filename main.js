// Dictates which player's turn it is (0 = X, 1 = O)
const players = ['X', 'O'];
var currentPlayer = 0;

// Scores of Players [X, O]
var scores = [0, 0];

// Arrays for the moves X and O make
var movesX = [];
var movesO = [];

// Time each player has
const TIME = 5;

// Time current player has left remaining
var currentTime = TIME;

// Player = 0, AI(X) = 1, AI(O) = 2
var ai = 0;

// Timer is paused
var paused = false;

// All possible win conditions
const WIN_CONDITIONS = [[0, 1, 2],
                       [3, 4, 5],
                       [6, 7, 8],
                       [0, 3, 6],
                       [1, 4, 7],
                       [2, 5, 8],
                       [0, 4, 8],
                       [2, 4, 6]];

// Disable all nodes
function disableAll(nodes){
    for(let i = 0; i < nodes.length; i++){
        nodes[i].classList.add('disabled');
    }
}

// Reset the board to an empty state
function newGame(nodes){
    document.getElementById('winnerMessage').style.display = "none";
    document.getElementById('playerMessage').style.display = "block";
        
    currentPlayer = 0;
    movesX = [];
    movesO = [];
    document.getElementById('display_player').innerHTML = players[currentPlayer];

    for(let i = 0; i < nodes.length; i++){
        nodes[i].classList.remove('disabled');
        nodes[i].firstChild.innerHTML = '';
        nodes[i].firstChild.classList.remove('xo');
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
    // Check every possible combination of win conditions for the current player
    for(let i = 0; i < WIN_CONDITIONS.length; i++){
        if(WIN_CONDITIONS[i].every(winCondition => {
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

// Update the UI for scores
function documentScores(){
    document.getElementById('scoreX').innerHTML = scores[0];
    document.getElementById('scoreO').innerHTML = scores[1];
}

// Countdown the timer
function countdown(time, player){
    currentTime--;
    time.innerHTML = currentTime;

    if(currentTime === 0){
        currentPlayer = currentPlayer ? 0 : 1;
        player.innerHTML = players[currentPlayer];
        currentTime = TIME + 1;
    }
}

function togglePlayerBtns(playerBtns, i){
    playerBtns.children[i].classList.toggle('playerBtnsDisable');
    playerBtns.children[ai].classList.toggle('playerBtnsDisable');
    ai = i;
}

function playAI(nodes){

}

// Add all EventListeners on load of the page
document.addEventListener('DOMContentLoaded', () => {
    var player = document.getElementById('display_player');
    player.innerHTML = players[currentPlayer];

    var playerMessage = document.getElementById('playerMessage');
    var winnerMessage = document.getElementById('winnerMessage');

    var nodes = document.getElementsByClassName('node');

    var time = document.getElementById('time');

    var timer = setInterval(countdown, 1000, time, player);

    var playerBtns = document.getElementById('playerButtons');

    for(let i = 0; i < nodes.length; i++){
        nodes[i].addEventListener('click', function(){
            this.classList.add('disabled');
            this.firstChild.innerHTML = players[currentPlayer];
            this.firstChild.classList.add('xo');

            recordMove(i);

            if(checkWinner()){
                winnerMessage.innerHTML = players[currentPlayer] + " is the winner!";
                winnerMessage.style.display = "block";

                playerMessage.style.display =  "none";
                scores[currentPlayer]++;
                documentScores();

                disableAll(nodes);

                clearInterval(timer);
            }
            else if(movesX.length + movesO.length >= 9){ // Check for draws
                winnerMessage.innerHTML = "It's a draw!";
                winnerMessage.style.display = "block";

                playerMessage.style.display = "none";

                clearInterval(timer);
            }
            else {
                currentPlayer = currentPlayer ? 0 : 1;
                player.innerHTML = players[currentPlayer];
                
                currentTime = TIME;
                time.innerHTML = currentTime;
                clearInterval(timer);
                timer = setInterval(countdown, 1000, time, player);
            }

            // If AI's turn play for AI
            if(ai){
                if(currentPlayer === ai - 1){
                    let randomMove = Math.floor(Math.random() * 9);;
                    while(movesO.includes(randomMove) || movesX.includes(randomMove)){
                        randomMove = Math.floor(Math.random() * 9);
                    }
                    nodes[randomMove].classList.add('disabled');
                    nodes[randomMove].firstChild.innerHTML = players[currentPlayer];
                    nodes[randomMove].firstChild.classList.add('xo');

                    recordMove(randomMove);

                    if(checkWinner()){
                        winnerMessage.innerHTML = players[currentPlayer] + " is the winner!";
                        winnerMessage.style.display = "block";
        
                        playerMessage.style.display =  "none";
                        scores[currentPlayer]++;
                        documentScores();
        
                        disableAll(nodes);
        
                        clearInterval(timer);
                    }
                    else if(movesX.length + movesO.length >= 9){ // Check for draws
                        winnerMessage.innerHTML = "It's a draw!";
                        winnerMessage.style.display = "block";
        
                        playerMessage.style.display = "none";
        
                        clearInterval(timer);
                    }
                    else {
                        currentPlayer = currentPlayer ? 0 : 1;
                        player.innerHTML = players[currentPlayer];
                        
                        currentTime = TIME;
                        time.innerHTML = currentTime;
                        clearInterval(timer);
                        timer = setInterval(countdown, 1000, time, player);
                    }
                }
            }
            
        });
    }

    document.getElementById('new_game').addEventListener('click', function(){
        newGame(nodes);
        
        currentTime = TIME;
        time.innerHTML = currentTime;
        clearInterval(timer);
        timer = setInterval(countdown, 1000, time, player);

        // If AI's turn play for AI
        if(ai){
            if(currentPlayer === ai - 1){
                let randomMove = Math.floor(Math.random() * 9);;
                while(movesO.includes(randomMove) || movesX.includes(randomMove)){
                    randomMove = Math.floor(Math.random() * 9);
                }
                nodes[randomMove].classList.add('disabled');
                nodes[randomMove].firstChild.innerHTML = players[currentPlayer];
                nodes[randomMove].firstChild.classList.add('xo');

                recordMove(randomMove);

                if(checkWinner()){
                    winnerMessage.innerHTML = players[currentPlayer] + " is the winner!";
                    winnerMessage.style.display = "block";
    
                    playerMessage.style.display =  "none";
                    scores[currentPlayer]++;
                    documentScores();
    
                    disableAll(nodes);
    
                    clearInterval(timer);
                }
                else if(movesX.length + movesO.length >= 9){ // Check for draws
                    winnerMessage.innerHTML = "It's a draw!";
                    winnerMessage.style.display = "block";
    
                    playerMessage.style.display = "none";
    
                    clearInterval(timer);
                }
                else {
                    currentPlayer = currentPlayer ? 0 : 1;
                    player.innerHTML = players[currentPlayer];
                    
                    currentTime = TIME;
                    time.innerHTML = currentTime;
                    clearInterval(timer);
                    timer = setInterval(countdown, 1000, time, player);
                }
            }
        }
    });

    document.getElementById('reset').addEventListener('click', function(){
        newGame(nodes);
        
        currentTime = TIME;
        time.innerHTML = currentTime;
        clearInterval(timer);
        timer = setInterval(countdown, 1000, time, player);

        scores[0] = 0;
        scores[1] = 0;
        documentScores();

        // If AI's turn play for AI
        if(ai){
            if(currentPlayer === ai - 1){
                let randomMove = Math.floor(Math.random() * 9);;
                while(movesO.includes(randomMove) || movesX.includes(randomMove)){
                    randomMove = Math.floor(Math.random() * 9);
                }
                nodes[randomMove].classList.add('disabled');
                nodes[randomMove].firstChild.innerHTML = players[currentPlayer];
                nodes[randomMove].firstChild.classList.add('xo');

                recordMove(randomMove);

                if(checkWinner()){
                    winnerMessage.innerHTML = players[currentPlayer] + " is the winner!";
                    winnerMessage.style.display = "block";
    
                    playerMessage.style.display =  "none";
                    scores[currentPlayer]++;
                    documentScores();
    
                    disableAll(nodes);
    
                    clearInterval(timer);
                }
                else if(movesX.length + movesO.length >= 9){ // Check for draws
                    winnerMessage.innerHTML = "It's a draw!";
                    winnerMessage.style.display = "block";
    
                    playerMessage.style.display = "none";
    
                    clearInterval(timer);
                }
                else {
                    currentPlayer = currentPlayer ? 0 : 1;
                    player.innerHTML = players[currentPlayer];
                    
                    currentTime = TIME;
                    time.innerHTML = currentTime;
                    clearInterval(timer);
                    timer = setInterval(countdown, 1000, time, player);
                }
            }
        }
    });

    document.getElementById('pause').addEventListener('click', function(){
        if(paused){
            timer = setInterval(countdown, 1000, time, player);
            paused = false;
        }
        else{
            clearInterval(timer);
            paused = true;
        }
    });

    for(let i = 0; i < playerBtns.children.length; i++){
        playerBtns.children[i].addEventListener('click', function(){
            togglePlayerBtns(playerBtns, i);

            // If AI's turn play for AI
            if(ai){
                if(currentPlayer === ai - 1){
                    let randomMove = Math.floor(Math.random() * 9);;
                    while(movesO.includes(randomMove) || movesX.includes(randomMove)){
                        randomMove = Math.floor(Math.random() * 9);
                    }
                    nodes[randomMove].classList.add('disabled');
                    nodes[randomMove].firstChild.innerHTML = players[currentPlayer];
                    nodes[randomMove].firstChild.classList.add('xo');

                    recordMove(randomMove);

                    if(checkWinner()){
                        winnerMessage.innerHTML = players[currentPlayer] + " is the winner!";
                        winnerMessage.style.display = "block";
        
                        playerMessage.style.display =  "none";
                        scores[currentPlayer]++;
                        documentScores();
        
                        disableAll(nodes);
        
                        clearInterval(timer);
                    }
                    else if(movesX.length + movesO.length >= 9){ // Check for draws
                        winnerMessage.innerHTML = "It's a draw!";
                        winnerMessage.style.display = "block";
        
                        playerMessage.style.display = "none";
        
                        clearInterval(timer);
                    }
                    else {
                        currentPlayer = currentPlayer ? 0 : 1;
                        player.innerHTML = players[currentPlayer];
                        
                        currentTime = TIME;
                        time.innerHTML = currentTime;
                        clearInterval(timer);
                        timer = setInterval(countdown, 1000, time, player);
                    }
                }
            }
        });
    }
});