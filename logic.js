//The logic of this code is to emulate a game of tic-tac-toe against an AI. It will be a game
//of five rounds. Highest score wins



const gameState = true;     //to track state of game
let humanScore = 0;          //track score of human
let aiScore = 0;             //track score of AI
let gameRounds = 0;          //to keep a track of the game round
let winScore = 5;            //to track whether human has won or AI has won


const humanPlayer = document.getElementById('player').value;      //get value from user selection 
const aiPlayer = (humanPlayer == 'X' ? 'O' : 'X');                //set aiPlayer
const aiLevel = document.getElementById('ai').value; 

function newGame() {         //resets all counters and conditions to initial value and clears the board                               
    gameState = true;       //to track state of game
    humanScore = 0;          //track score of human
    aiScore = 0;             //track score of AI
    gameRounds = 0;          //to keep a track of the game round
    winScore = 5;            //to track whether human has won or AI has won
    restartGame();
}

function restartGame() {           //resets the current game
    const gameBoard = document.querySelectorAll('.cell');
    gameBoard.forEach(cell => cell.innerText = '');
}


function setupBoard() {
    restartGame();
    playerChoice();
}

function endRound() {               //end the round
    gameRounds++;                   //increment gameRounds
    updateScoreDisplay();          //update the display
    if(gameRounds < 5) {
        setTimeout(setupBoard, 2000);          
    }
    else {
        checkForTournamentWinner();
    }
}

function winConditions(currentBoard, player) {       //set the winning conditions for the board i.e. the cells 
    if (
        (currentBoard[0] == player && currentBoard[1] == player && currentBoard[2] == player) ||
        (currentBoard[3] == player && currentBoard[4] == player && currentBoard[5] == player) ||
        (currentBoard[6] == player && currentBoard[7] == player && currentBoard[8] == player) ||
        (currentBoard[0] == player && currentBoard[3] == player && currentBoard[6] == player) ||
        (currentBoard[1] == player && currentBoard[4] == player && currentBoard[7] == player) ||
        (currentBoard[2] == player && currentBoard[5] == player && currentBoard[8] == player) ||
        (currentBoard[0] == player && currentBoard[4] == player && currentBoard[8] == player) ||
        (currentBoard[2] == player && currentBoard[4] == player && currentBoard[6] == player)
        ) {
            return true
    }
    return false;
}

function minimaxWithDepth(currentBoard, player, depth) {          //set up the minimax function with depth to control difficulty
    let availCells = currentBoard.filter(cell => cell != 'X' && cell != 'O');

    if(winConditions(currentBoard, aiPlayer)) {
        return {score: 10};
    }
    else if(winConditions(currentBoard, humanPlayer)) {
        return {score: -10};
    }
    else if(availCells.length === 0 || depth === 0){
        return {score: 0};
    }

    const moves = [];              //create an empty array to store moves

    for(let i = 0; i < availCells.length; i++) {
        
        var move = {};             //create a move object to store the move of each empty spot

        move.index = availCells[i];       //set index of the move to current empty spot

        availCells[i] = player;           //set the empty spot to the player

        if(player == humanPlayer) {
            var result = minimaxWithDepth(currentBoard, aiPlayer, depth - 1)    //get the result of calling the minimax with depth if the opponent is human
            move.score = result.score;
        }
        else {
            var result = minimaxWithDepth(currentBoard, humanPlayer, depth - 1)
            move.score = result.score;
        }

        //reset the board
        availCells[i] = move.index;

        //push the move into the moves array
        moves.push(move);

    }

    let bestMove;               //variable to select the best move
    if(player == aiPlayer) {       //if the player is aiPlayer, use a variable to get the maximizing move for AI
        let bestScore = -Infinity;
        for(let i = 0; i < moves.length; i++) {
            if(moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    else {
        let bestScore = Infinity;   //if player is humanPlayer, use a variable to get the minimizing move for AI
        for(let i = 0; i < moves.length; i++) {
            if(moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];

}

function checkTie(currentBoard, player) {           //check for whether the game is a tie
    if(!winConditions(currentBoard, player)) {
        if(currentBoard.every((cell => cell.innerText != ''))) {
            window.alert("It's a tie!")
            restartGame();
        }   
    }
}


function playerChoice() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', function() {
            if(cell.innerText === '') {
                cell.innerText = humanPlayer;
                // After player move, call the AI move and update the game state
                if(checkForRoundWinner() || checkTie()){
                    endRound();
                }
                else{
                    aiChoice();
                }
            }
        });
    });
}

function aiChoice() {
    const cells = document.querySelectorAll('.cell');  //get all the cells
    const currentBoard = Array.from(cells, cell => cell.innerText); //current board is a game array that has all the X's and O's
 
    let move;       //ai's move
     if(aiLevel === 'easy') {
         move = minimaxWithDepth(currentBoard, aiPlayer, 1);
     }
     else if(aiLevel === 'medium') {
         move = minimaxWithDepth(currentBoard, aiPlayer, 3);
     }
     else {
         move = minimaxWithDepth(currentBoard, aiPlayer, 10);
     }
 
     //let's apply AI's move
     if(move && move.index !== undefined) {
         cells[move.index].innerText = aiPlayer;
     }
}

function updateScoreDisplay() {
    const aiScoreDisplay = document.querySelector('#ai-score');
    const humanScoreDisplay = document.querySelector('#player-score');
    
    aiScoreDisplay.innerText = aiScore;
    humanScoreDisplay.innerText = humanScore;
}

function checkForTournamentWinner() {
    if (humanScore > aiScore) {
        window.alert("Human wins the tournament!");
    }
    else if(aiScore > humanScore) {
        window.alert("AI wins the tournament!");
    }
    else {
        window.alert("The tournament ends in a tie!")
    }
}

function checkForRoundWinner() {                     //check for winner for current round and update display on UI
    if(winConditions(currentBoard, aiPlayer)) {
        aiScore += 1;
        window.alert("AI wins this round!");
        restartGame();
    }
    if(winConditions(currentBoard, humanPlayer)) {
        humanScore += 1;
        window.alert("Human wins this round!");
        restartGame();
    }
}


function gameController() {        //function to control game flow
    setupBoard();
    playerChoice();
}

document.addEventListener('DOMContentLoaded', function() {
    gameController();
});

document.querySelector('#new-game').onclick = newGame;
document.querySelector('#restart-game').onclick = restartGame;