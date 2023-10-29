//The logic of this code is to emulate a game of tic-tac-toe. It will be a game
//of three rounds. Best of three out of 5 rounds wins
//Code plan - a function to receive and return the choice of the player.
        //  - a function to receive and return the choice of ai mode
        //  - a game controller function to switch between player choice and ai choice and return game state
        //  - a function to keep track of score based on game state and display results
        //  - a function to implement the type of AI based on player choice (minimax algorithm)
//Now each line may have more functions

(function playerChoice() { //function to take a player's choice and append player choice (i.e. X or O) to any game cell
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
})();

