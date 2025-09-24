export type Add = (a: number, b: number) => number;
export const add: Add = (x, y) => x + y;


/* export type PlayerBtnLabel = {
X: string;
O: string;
}; */


/* export const defaultPlayerBtnLabels = {
    unlocked? " " : PlayerBtnLabels
}; */
export type Row = [Cell, Cell, Cell];

/*export const emptyBoard: Board = [

       [null,null,null],
        [null,null,null],
        [null,null,null]      

]; */

export type Cell = 'X' | 'O' | '';
type Player = 'X' | 'O';

export type GameState = {
    board: Cell[][];
    currentPlayer: Player
    isGameOver: boolean;
    isTie: boolean;
    outputMessage: string;

};

export const defaultGameState: GameState = {
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    currentPlayer: 'X',
    isGameOver: false,
    isTie: false,
    outputMessage: " "

};

function CheckWinner(gameState: GameState, row: number, col: number): boolean {
    let winner: boolean = false;

    //check if any rows are filled
    for (let i = 0; i < 3; ++i) {
        winner = gameState.board[i].every(cell => cell === "X") || gameState.board[i].every(cell => cell === "O");


        if (winner) {
            console.log("detected winner");
            gameState.isGameOver = winner;
            //gameState.outputMessage = "Winner: " + gameState.currentPlayer;
            return winner;

        }
    }


    //check if columns are filled
    const firstCol: string[] = [];
    for (let z = 0; z < 3; ++z) {
        for (let i = 0; i < 3; ++i) {
            //fill in a temp array of col vals per row
            firstCol.push(gameState.board[i][z]);


        }
        if (firstCol.every(cell => cell === "X") || firstCol.every(cell => cell === "O")) {
            winner = true;
            gameState.isGameOver = winner;
            //gameState.outputMessage = "Winner: " + gameState.currentPlayer;
            return winner;

        }
    }

    //check if diagonal is filled- push diagonal into array, check values
    //checking L -> R
    const secondCol: string[] = [];
    for (let i = 0; i < 3; i++) {
        secondCol.push(gameState.board[i][i]);
    }
    winner = (secondCol.every(cell => cell === "X") || secondCol.every(cell => cell === "O"));
    if (winner) {
        gameState.isGameOver = winner;
        //gameState.outputMessage = "Winner: " + gameState.currentPlayer;
        return winner;

    }

    //very messy way to check R -> L
    const diagCol: string[] = [];
    diagCol.push(gameState.board[0][2]);
    diagCol.push(gameState.board[1][1]);
    diagCol.push(gameState.board[2][0]);
    if (diagCol.every(cell => cell === "X") || diagCol.every(cell => cell === "O")) {
        winner = true;
        gameState.isGameOver = winner;
        //gameState.outputMessage = "Winner: " + gameState.currentPlayer;
        return winner;
    }

    return winner;
}

//const function CheckForTie



// function: give me a board, and a location that I clicked
// return a new state of the game
export function makeMove(gameState: GameState, row: number, col: number): GameState {



    /* if(CheckWinner(gameState,row,col)){gameState.outputMessage = "Winner: " + gameState.currentPlayer;
         return gameState;
 
     }*/

    const newState = structuredClone(gameState)

    console.log(`${gameState.currentPlayer}`);
    console.log(`${newState.isGameOver}`);
    //update the board
    newState.board[row][col] = gameState.currentPlayer;
    const prevPlayer = newState.currentPlayer;
    //update currentPlayer- if current player is X, update currentPlayer to O, otherwise keep as X
    const nextPlayer = newState.currentPlayer === 'X' ? 'O' : 'X';
       //update nextPlayer
       console.log(`${gameState.currentPlayer}`);
    newState.currentPlayer = nextPlayer;
    
   // let winner: boolean = false;
   // console.log(`${winner}`);

    /*  if(gameState.isGameOver) {
           newState.outputMessage = "Winner: " + newState.currentPlayer;
           return gameState;
       }*/

    //check if any rows are filled
    for (let i = 0; i < 3; ++i) {
        let winner: boolean = false;
        winner = newState.board[i].every(cell => cell === "X") || newState.board[i].every(cell => cell === "O");
        console.log(`${winner}`);

        if (winner) {
            console.log("detected winner");
            newState.isGameOver = winner;
            newState.outputMessage = "Winner: " + prevPlayer;
            return newState;

        }
    }

    const firstCol: string[] = [];
    //check if columns are filled
    for (let z = 0; z < 3; ++z) {
        for (let i = 0; i < 3; ++i) {
            //fill in a temp array of col vals per row
            firstCol.push(newState.board[i][z]);


        }
        if (firstCol.every(cell => cell === "X") || firstCol.every(cell => cell === "O")) {
            let winner: boolean = true;
            winner = true;
            newState.isGameOver = winner;
            newState.outputMessage = "Winner: " + newState.currentPlayer;
            return newState;

        }
    }
    //check if diagonal is filled- push diagonal into array, check values
    //checking L -> R
    const secondCol: string[] = [];
    for (let i = 0; i < 3; i++) {
        secondCol.push(newState.board[i][i]);
    }
   // winner = (secondCol.every(cell => cell === "X") || secondCol.every(cell => cell === "O"));
    if ((secondCol.every(cell => cell === "X") || secondCol.every(cell => cell === "O"))) {
        newState.isGameOver = true;
        newState.outputMessage = "Winner: " + newState.currentPlayer;
        return newState;

    }
    //very messy way to check R -> L
    const diagCol: string[] = [];
    diagCol.push(newState.board[0][2]);
    diagCol.push(newState.board[1][1]);
    diagCol.push(newState.board[2][0]);
    if (diagCol.every(cell => cell === "X") || diagCol.every(cell => cell === "O")) {
        
        newState.isGameOver = true;
        newState.outputMessage = "Winner: " + newState.currentPlayer;
        return newState;
    }


    //check if board is full, for a draw   
    if (newState.board.flat().every(cell => cell === "X" || cell === "O")) {
        newState.isGameOver = true;
        newState.isTie = true;
        newState.outputMessage = "Draw";
        return newState;
    }

   // newState.isGameOver = winner;
    // (hint) 3. detect a winner?

    
    

    return newState;
}