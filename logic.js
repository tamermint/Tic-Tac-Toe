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

function playerChoice() { //function to determine player's choice i.e. play as X or play as O
    // const gameContainer = document.getElementById('game-container');
    const playChoice = document.getElementById('player').value;

    /* gameContainer.addEventListener('click', function(event){     //attach event listener to the parent and then delegate based on area clicked
        if(event.target.classList.contains('cell')) {            //check if where the user has clicked is indeed a cell
            const cell = event.target;

            //check if cell is empty before placing a player's choice
            if(cell.textContent === ''){
                
                cell.textContent = playChoice;
            }
        }
    }) */
    return playChoice;
}

function determineAiPlayerMode() {       //check what the human is playing as choose the opposite 
    const playChoice = playerChoice();
    return aiPlayer = (playChoice == 'X' ? 'O' : 'X');   
}

function minimaxWithDepth(currentBoard, player, depth) {
    let availCells = currentBoard.filter(cell => cell != 'X' && cell != 'O');

    const aiPlayer = determineAiPlayerMode();
    const humanPlayer = playerChoice();

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



function winConditions(currentBoard, player) {
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

function checkTie(currentBoard, player) {
    if(!winConditions(currentBoard, player)) {
        currentBoard.every((cell => {
            if(cell.value != '') {
                cell.style.backgroundColor = 'blue';
                window.alert("It's a tie!")
            }
        }))
    }
}

function checkForWin() {
    //check if player (ai or human) has won 3/5 games, if yes, declare them tournament winner and update game state to stop game
    if(winScore - aiScore == 2) {
        window.alert("AI wins the tournament!");
        gameState = false;
    }
    else if(winScore - humanScore == 2) {
        window.alert("Human wins the tournament!");
        gameState = false;
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


