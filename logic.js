//The logic of this code is to emulate a game of tic-tac-toe against an AI. It will be a game
//of five rounds. Highest score wins



let humanScore = 0;          //track score of human
let aiScore = 0;             //track score of AI
let gameRounds = 0;          //to keep a track of the game round


const currentBoardState = Array(9).fill('');                      //global variable to maintain game state
let humanPlayer = document.getElementById('player').value;      //get value from user selection 
let aiPlayer = (humanPlayer == 'X' ? 'O' : 'X');                //set aiPlayer
let aiLevel = document.getElementById('ai').value; 

function newGame() {         //resets all counters and conditions to initial value and clears the board 
    humanPlayer = document.getElementById('player').value;
    aiPlayer = (humanPlayer == 'X' ? 'O' : 'X');
    aiLevel = document.getElementById('ai').value;
    
    humanScore = 0;          //track score of human
    aiScore = 0;             //track score of AI
    gameRounds = 0;          //to keep a track of the game round
    updateScoreDisplay();
    restartGame();
}

function restartGame() {           //resets the current game
    const gameBoard = document.querySelectorAll('.cell');
    gameBoard.forEach(cell => cell.innerText = '');
}


function setupBoard() {
    currentBoardState.fill('');
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
    let availCells = currentBoard.map((cell, index) => cell === '' ? index : null).filter(index => index != null);

    if(winConditions(currentBoard, aiPlayer)) {
        return {score: 10 - depth};                    //prioritize a quick win for AI
    }
    else if(winConditions(currentBoard, humanPlayer)) {
        return {score: depth - 10};                    //human winning, return a -ve score for AI which will make it avoid that move
    }
    else if(availCells.length === 0){
        return {score: 0};
    }

    let moves = [];              //create an empty array to store moves

    availCells.forEach((cellIndex) => {
        
        let move = { index: cellIndex };             //create a move object to store the move of each empty spot

        currentBoard[cellIndex] = player;           //try move


        if(player == aiPlayer) {
            let result = minimaxWithDepth(currentBoard, humanPlayer, depth - 1)    //get the result of calling the minimax with depth if the opponent is human
            move.score = result.score;
        }
        else {
            let result = minimaxWithDepth(currentBoard, aiPlayer, depth - 1)
            move.score = result.score;
        }

        //reset the board
        currentBoard[cellIndex] = '';

        //push the move into the moves array
        moves.push(move);

    });

    let bestMove;                   //variable to select the best move
    if(player == aiPlayer) {       //if the player is aiPlayer, use a variable to get the maximizing move for AI
        let bestScore = -Infinity;
        moves.forEach((move) => {
            if(move.score > bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    }
    else {
        let bestScore = Infinity;   //if player is humanPlayer, use a variable to get the minimizing move for AI
        moves.forEach((move) => {
            if(move.score < bestScore) {
                bestScore = move.score;
                bestMove = move;
            }
        });
    }
    return bestMove;
}

function checkTie(currentBoard) {
    // Check if all cells are filled and no winner
    return currentBoard.every(cell => cell !== '') &&
           !winConditions(currentBoard, humanPlayer) &&
           !winConditions(currentBoard, aiPlayer);
}


function playerChoice() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', function onCellClick() {
            if (cell.innerText === '' && !winConditions(currentBoardState, humanPlayer) && !winConditions(currentBoardState, aiPlayer)) {
                cell.innerText = humanPlayer;
                currentBoardState[index] = humanPlayer;
                cell.removeEventListener('click', onCellClick);
                
                setTimeout(() => {
                    if (checkForRoundWinner() || checkTie(currentBoardState)) {
                        endRound();
                    }
                    else{
                        aiChoice();
                    }
                }, 100)
            }
        });
    });
}

function aiChoice() {
    let move;
   switch(aiLevel) {
    case 'easy':
        move = minimaxWithDepth([...currentBoardState], aiPlayer, 1);
        break;
    case 'medium':
        move = minimaxWithDepth([...currentBoardState], aiPlayer, 3);
        break;
    case 'overlord':
        move = minimaxWithDepth([...currentBoardState, aiPlayer, 5]);
        break;
    default:
        move = { index: Math.floor(Math.random() * 9) };    //random move for fallback
        break;
   }

    if (move && move.index !== undefined && currentBoardState[move.index] === '') {
        const cells = document.querySelectorAll('.cell');
        cells[move.index].innerText = aiPlayer;
        currentBoardState[move.index] = aiPlayer;

        setTimeout(() => {
            checkForRoundWinner();
        }, 100);
       
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
        restartGame();
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