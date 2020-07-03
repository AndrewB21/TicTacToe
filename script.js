const boardWrapper = document.querySelector('#board-wrapper')
const winMessage = document.querySelector('h2');

const gameboard = (() => {
    let board = [];
    const createBoard = () => {
        for (let i = 0; i < 9; i++){
            board.push([""]);
        }
        return board;
    }

    const updateBoard = (squareIndex, playerMark) => {
        board[squareIndex] = playerMark;
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
        
        array.forEach((square, index)  => {
            gameSquare = document.createElement('div');
            gameSquare.className = 'board-square';
            gameSquare.id = `square${index}`;
            gameSquare.innerHTML = `<p class="square-text">${square}</p>`
            gameSquare.addEventListener('click', () => {
                gameController.setMark(index);
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
        for (let i = 0; i < 9; i += 3){
            if(board[i] == board[i+1] && board[i] == board[i+2]){
                return true;
            }
        }
        //check for vertical wins
        for (let i = 0; i < 4; i++){
            if(board[i] == board[i+3] && board[i] == board[i+6]){
                return true;
            }
        }
        //check for diagonal wins
        if((board[2] == board[4] && board[2] == board[6]) || (board[0] == board[4] && board[0] == board[8])){
            return true;
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
            if(checkWin(gameboard.getBoard())){
                winMessage.appendChild(document.createTextNode(`Game Over, ${activePlayer.name} wins!`));
            };
            changeActivePlayer(activePlayer);
        }
    }

    return {setActivePlayer, changeActivePlayer, setMark, setPlayers};
})();

const playerFactory = (name, playerMark, ) => {
    return {name, playerMark}
}

playerOne = playerFactory('Player 1', "O");
playerTwo = playerFactory('Player 2', 'X');

gameController.setPlayers([playerOne, playerTwo]);
gameController.setActivePlayer(playerOne);
displayController.displayBoard(gameboard.createBoard());





