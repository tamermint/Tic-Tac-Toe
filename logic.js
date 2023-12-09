//The logic of this code is to emulate a game of tic-tac-toe against an AI. It will be a game
//of five rounds. Highest score wins



const gameState = true;     //to track state of game
let humanScore = 0;          //track score of human
let aiScore = 0;             //track score of AI
let gameRounds = 0;          //to keep a track of the game round


const currentBoardState = Array(9).fill('');                      //global variable to maintain game state
const humanPlayer = document.getElementById('player').value;      //get value from user selection 
const aiPlayer = (humanPlayer == 'X' ? 'O' : 'X');                //set aiPlayer
const aiLevel = document.getElementById('ai').value; 

function newGame() {         //resets all counters and conditions to initial value and clears the board 
    humanPlayer = document.getElementById('player').value;
    aiPlayer = (humanPlayer == 'X' ? 'O' : 'X');
    aiLevel = document.getElementById('ai').value;
    
    gameState = true;       //to track state of game
    humanScore = 0;          //track score of human
    aiScore = 0;             //track score of AI
    gameRounds = 0;          //to keep a track of the game round
    restartGame();
}

function restartGame() {           //resets the current game
    const gameBoard = document.querySelectorAll('.cell');
    gameBoard.forEach(cell => cell.innerText = '');
}


function setupBoard() {
    currentBoardState.fill('');
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

function checkTie(currentBoard) {           //check for whether the game is a tie
    if(!winConditions(currentBoard, aiPlayer) && !winConditions(currentBoard, humanPlayer)) {
        if(currentBoard.every((cell => cell.innerText != ''))) {
            window.alert("It's a tie!")
            return true;
        }   
    }
    return false;
}


function playerChoice() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', function onCellClick() {
            if (cell.innerText === '' && !winConditions(currentBoardState, humanPlayer) && !winConditions(currentBoardState, aiPlayer)) {
                cell.innerText = humanPlayer;
                currentBoardState[index] = humanPlayer;
                cell.removeEventListener('click', onCellClick);
                
                if (checkForRoundWinner() || checkTie(currentBoardState)) {
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
    let move;
    if (aiLevel === 'easy') {
        move = minimaxWithDepth(currentBoardState, aiPlayer, 1);
    } else if (aiLevel === 'medium') {
        move = minimaxWithDepth(currentBoardState, aiPlayer, 3);
    } else {
        move = minimaxWithDepth(currentBoardState, aiPlayer, 10);
    }

    if (move && move.index !== undefined && currentBoardState[move.index] === '') {
        const cells = document.querySelectorAll('.cell');
        cells[move.index].innerText = aiPlayer;
        currentBoardState[move.index] = aiPlayer;
        checkForRoundWinner();
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
        newGame();
    }
    else if(aiScore > humanScore) {
        window.alert("AI wins the tournament!");
        newGame();
    }
    else {
        window.alert("The tournament ends in a tie!");
        newGame();
    }
}

function checkForRoundWinner() {                     //check for winner for current round and update display on UI
    let roundWon = false;
    if(winConditions(currentBoardState, aiPlayer)) {
        aiScore += 1;
        window.alert("AI wins this round!");
        roundWon = true;
    }
    if(winConditions(currentBoardState, humanPlayer)) {
        humanScore += 1;
        window.alert("Human wins this round!");
        roundWon = true;
    }
    if(roundWon) {
        updateScoreDisplay();
        endRound();
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