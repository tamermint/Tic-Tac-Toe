//The logic of this code is to emulate a game of tic-tac-toe. It will be a game
//of three rounds. Best of three out of 5 rounds wins
//Code plan - a function to receive and return the choice of the player.
        //  - a function to receive and return the choice of ai mode
        //  - a game controller function to switch between player choice and ai choice and return game state
        //  - a function to keep track of score based on game state and display results
        //  - a function to implement the type of AI based on player choice (minimax algorithm)
//Now each line may have more functions

const isWon = false;         //to check if win condition was acheived by either human/AI
const gameState = false;     //to track state of game
let humanScore = 0;          //track score of human
let aiScore = 0;             //track score of AI

function playerChoice() { //function to take a player's choice and append player choice (i.e. X or O) to any game cell
    const gameContainer = document.getElementById('game-container');

    gameContainer.addEventListener('click', function(event){     //attach event listener to the parent and then delegate based on area clicked
        if(event.target.classList.contains('cell')) {    //check if where the user has clicked is indeed a cell
            const cell = event.target;

            //check if cell is empty before placing a player's choice
            if(cell.textContent === ''){
                const playChoice = document.getElementById('player').value;
                cell.textContent = playChoice;
            }
        }
    })
}

function determineAiPlayerMode(aiPlayer) {       //check what the human is playing as
    const playChoice = document.getElementById('player').value;
    playChoice == 'X' ? aiPlayer = 'O' : 'X';
    return aiPlayer;
}

function minimax(currentBoard, player, difficultyScore) {
    //function to determine the best move AI should make, check for terminal states
    let availCells = currentBoard.filter(cell => cell != 'X' && cell != 'O');
    if (difficultyScore == 2) {
        if(winConditions(currentBoard, player) && player == 'aiPlayer'){
            return {score: 10};
        }
        else if(winConditions(currentBoard, player) && player == 'humanPlayer') {
            return {score: -10};
        }
        else if(availCells.length === 0) {
            return {score: 0};
        }
    }
}

function aiChoice(currentBoard) { // takes the current board after the player has made the choice, and based on AI difficulty level, run minimax on available spots and fill in the choice
    const aiPlayerMode = determineAiPlayerMode(aiPlayer); 
    const aiDifficultyLevel = document.getElementById('ai').value;

    if(aiDifficultyLevel == 'easy') {
        //the player wins 4 / 5 games
    }
    else if(aiDifficultyLevel == 'medium') {
        //the player wins 2 / 5 games
    }
    else {
        //the player is unable to win or results in tie
    }
    return gameContainer;
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


