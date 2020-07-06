const boardWrapper = document.querySelector('#board-wrapper')
const squareDivs = document.querySelectorAll(".board-square")
const startBtn = document.querySelector(".start-btn");
const playersForm = document.querySelector("#add-players");
const playerOneName = document.querySelector("#p1-name");
const playerOneMark = document.querySelector("#p1-mark");
const playerTwoName = document.querySelector("#p2-name");
const playerTwoMark = document.querySelector("#p2-mark");
const resetBtn = document.querySelector('#reset-btn');



const gameboard = (() => {
    let board = [];
    
    const createBoard = () => {
        for (let i = 0; i < 9; i++){
            board.push("");
        }
    }

    const clearBoard = () => {
        board = [];
    }

    const updateBoard = (squareIndex, playerMark) => {
        board[squareIndex] = playerMark;
        squareDivs[squareIndex].textContent = playerMark;
    }

    const getBoard = () => {
        return board;
    }

    const setListeners = () => {
        squareDivs.forEach((square, index)  => {
            const clickHandler = () =>{
                gameController.setMark(index);
            }
            square.addEventListener('click', clickHandler);
        })
    }

    return{ createBoard, clearBoard, updateBoard, getBoard, setListeners };
})();

const gameController = (() => {
    let activePlayer = null;
    let player1 = null;
    let player2 = null;
    let winSequence = [];


    const setPlayers = (players) =>{
        player1 = players[0];
        player2 = players[1];
        return {player1, player2};
    }

    const setActivePlayer = (player) => {
        activePlayer = player;
    }

    const checkWin = (board) => {
         //check for horizontal wins
        for (let i = 0; i < 9; i += 3){
            if(board[i] == board[i+1] && board[i] == board[i+2] && board[i] != ""){
                return [i, i+1, i+2];
            }
        }
        //check for vertical wins
        for (let i = 0; i < 4; i++){
            if(board[i] == board[i+3] && board[i] == board[i+6] && board[i] != ""){
                return [i, i+3, i+6];
            }
        }
        //check for diagonal wins
        if((board[2] == board[4] && board[2] == board[6]) && board[2] != ""){
            return [2, 4, 6]
        }else if((board[0] == board[4] && board[0] == board[8]) && board[0] != ""){
            return [0, 4, 8];
        }else{
            return false;
        }
    }

    const changeActivePlayer = (currentActivePlayer) => {
        if (currentActivePlayer === player1){
            activePlayer = player2;
        }else{
            activePlayer = player1;
        }
    }

    const setMark = (square) => {
        if(gameboard.getBoard()[square] != ""){
            return;
        }else{
            gameboard.updateBoard(square, activePlayer.playerMark);
            winStatus = checkWin(gameboard.getBoard());
            
            if(winStatus){
                winStatus.forEach((index) =>{
                    winSequence.push(index);
                    squareDivs[index].classList.toggle('win');
                })
                boardWrapper.classList.toggle('inactive-board');
            };
            
            changeActivePlayer(activePlayer);
        }
    }

    const resetGame = () => {
        gameboard.clearBoard();
        squareDivs.forEach(square => {
            square.textContent = "";
        })

        gameboard.createBoard();

        if (winSequence.length > 0){
            boardWrapper.classList.toggle('inactive-board');
        }
        winSequence.forEach((index) => {
            squareDivs[index].classList.toggle('win');
        })
        winSequence = []
    }

    return { setActivePlayer, changeActivePlayer, setMark, setPlayers, resetGame };
})();

const playerFactory = (name, playerMark, ) => {
    return {name, playerMark}
}


gameboard.createBoard();
gameboard.setListeners();
startBtn.addEventListener('click', () => {
    let playerOne = playerFactory(playerOneName.value, playerOneMark.value);
    let playerTwo = playerFactory(playerTwoName.value, playerTwoMark.value);
    gameController.setPlayers([playerOne, playerTwo]);
    gameController.setActivePlayer(playerOne);
    playersForm.classList.toggle("hidden");
})

resetBtn.addEventListener('click', gameController.resetGame)