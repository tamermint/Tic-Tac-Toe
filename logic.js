//The logic of this code is to emulate a game of tic-tac-toe against an AI. It will be a game
//of three rounds. Best of three out of 5 rounds wins
//Code plan - a function to receive and return the choice of the player.
        //  - a function to receive and return the choice of ai mode
        //  - a game controller function to switch between player choice and ai choice and return game state
        //  - a function to keep track of score based on game state and display results
        //  - a function to implement the type of AI based on player choice (minimax algorithm)
//Now each line may have more functions

const isWon = false;         //to check if win condition was acheived by either human/AI
const gameState = true;     //to track state of game
let humanScore = 0;          //track score of human
let aiScore = 0;             //track score of AI
let gameRounds = 0;          //to keep a track of the game round
let winScore = 5;            //to track whether human has won or AI has won


const humanPlayer = document.getElementById('player').value;      //get value from user selection 
const aiPlayer = (humanPlayer == 'X' ? 'O' : 'X');                //set aiPlayer 


function minimaxWithDepth(currentBoard, player, depth) {          //set up the minimax function with depth to control difficulty
    let availCells = currentBoard.filter(cell => cell != 'X' && cell != 'O');

    if(winConditions(currentBoard, aiPlayer)) {
        return {score: 10};
    }
    else if(winConditions(currentBoard, humanPlayer)) {
        return {score: -10};
    }
    else if(availCells.length === 0){
        return {score: 0};
    }

    const moves = [];              //create an empty array to store moves

    for(let i = 0; i < availCells.length; i++) {
        
        var move = {};             //create a move object to store the move of each empty spot

        move.index = currentBoard[availCells[i]];       //set index of the move to current empty spot

        currentBoard[availCells[i]] = player;           //set the empty spot to the player

        if(player == humanPlayer) {
            var result = minimaxWithDepth(currentBoard, aiPlayer, depth - 1)    //get the result of calling the minimax with depth if the opponent is human
            move.score = result.score;
        }
        else {
            var result = minimaxWithDepth(currentBoard, humanPlayer, depth - 1)
            move.score = result.score;
        }

        //reset the board
        currentBoard[availCells[i]] = move.index;

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

function checkTie(currentBoard, player) {           //check for whether the game is a tie
    if(winConditions(currentBoard, player) == false) {
        if(currentBoard.every((cell => cell.value != ''))) {
            window.alert("It's a tie!")
        }   
    }
}

function checkForRoundWinner() {                     //check for winner for current round and update display on UI
    if(winConditions(currentBoard, aiPlayer)) {
        aiScore += 1;
        const aiScoreDisplay = document.querySelector('#ai-score');
        aiScoreDisplay.innerText = aiScore;
    }
    if(winConditions(currentBoard, humanPlayer)) {
        humanScore += 1;
        const humanScoreDisplay = document.querySelector('#player-score');
        humanScoreDisplay.innerText = humanScore;
    }
}

function gameController() {        //function to control game flow
    while(gameRounds <= 5) {       //game has 5 rounds and best of 3 rounds wins!
       //check whether game state is false
        if(gameState) {
            playerChoice();
            aiPlayerChoice(currentBoard);
        }
        else {
            checkForWin();
        }
        gameRounds++;              //increment till 5 
    }
}


