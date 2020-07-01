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
        return board;
    }

    return{ updateBoard, createBoard };
})();

const displayController = (() => {
    const displayBoard = (array) => {
        while(boardWrapper.firstChild){
            boardWrapper.removeChild(boardWrapper.firstChild);
        }
        
        array.forEach(square => {
            gameSquare = document.createElement('div');
            gameSquare.className = 'board-square';
            gameSquare.id = square[0];
            gameSquare.innerText = square[1];
            gameSquare.addEventListener('click', () => {
                console.log('hello');
            })
            boardWrapper.appendChild(gameSquare);
        })
    }
    return {displayBoard};
})();


displayController.displayBoard(gameboard.createBoard());
displayController.displayBoard(gameboard.updateBoard(4, 'O'));
