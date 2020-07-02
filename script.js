const boardWrapper = document.querySelector('#board-wrapper')


const gameboard = (() => {
    let board = [];
    const createBoard = () => {
        for (let i = 0; i < 9; i++){
            board.push([i, ""]);
        }
        return board;
    }

    const updateBoard = (square, playerMark) => {
        board[square][1] = playerMark;
        displayController.displayBoard(board);
    }

    const getBoard = () => {
        return board;
    }

    return{ updateBoard, createBoard, getBoard };
})();

const displayController = (() => {
    const displayBoard = (array) => {
        while(boardWrapper.firstChild){
            boardWrapper.removeChild(boardWrapper.firstChild);
        }
        
        array.forEach((square, playerMark) => {
            gameSquare = document.createElement('div');
            gameSquare.className = 'board-square';
            gameSquare.id = `square${square[0]}`;
            gameSquare.innerHTML = `<p class="square-text">${square[1]}</p>`
            gameSquare.addEventListener('click', () => {
                gameController.setMark(square[0]);
                //console.log(square[0]);
            })
            boardWrapper.appendChild(gameSquare);
        })
    }
    return {displayBoard};
})();

const gameController = ((players) => {
    let activePlayer = null;
    let player1 = null;
    let player2 = null;


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

        //check for vertical wins
        
        //check for diagonal wins
        
    }

    const changeActivePlayer = (currentActivePlayer) => {
        if (currentActivePlayer === player1){
            activePlayer = player2;
        }else{
            activePlayer = player1;
        }
    }

    const setMark = (square) => {
        gameboard.updateBoard(square, activePlayer.playerMark);
        if(checkWin(gameboard.getBoard())){
            console.log("game over")
        };
        changeActivePlayer(activePlayer);
    }

    return {setActivePlayer, changeActivePlayer, setMark, setPlayers, player1, player2};
})();

const playerFactory = (name, playerMark, ) => {
    return {name, playerMark}
}

playerOne = playerFactory('player1', "O");
playerTwo = playerFactory('player2', 'X');

gameController.setPlayers([playerOne, playerTwo]);
gameController.setActivePlayer(playerOne);
displayController.displayBoard(gameboard.createBoard());





