export type Add = (a: number, b: number) => number;
export const add: Add = (x,y) => x + y;


/* export type PlayerBtnLabel = {
X: string;
O: string;
}; */


/* export const defaultPlayerBtnLabels = {
    unlocked? " " : PlayerBtnLabels
}; */
export type Row = [Cell,Cell,Cell];

/*export const emptyBoard: Board = [

       [null,null,null],
        [null,null,null],
        [null,null,null]      

]; */

export type Cell = 'X' | 'O' | '';
type Player = 'X'| 'O';

export type GameState = {
    board:Cell[][];
    currentPlayer: Player 
    isGameOver:boolean;
};

export const defaultGameState: GameState = {
    board: [
        ['','',''],
        ['','',''],
        ['','','']
          ],
    currentPlayer:'X',
    isGameOver:false

};

/*function checkForWin(){
    return undefined
}*/

// function: give me a board, and a location that I clicked
// return a new state of the game
export function makeMove(gameState: GameState, row: number, col: number): GameState {
    //gameState.isGameOver = true;
    if(gameState.isGameOver) return gameState;


    const newState = structuredClone(gameState)
    let winner: boolean = false;

    //update currentPlayer- if current player is X, update currentPlayer to O, otherwise keep as X
    const nextPlayer = newState.currentPlayer === 'X'?'O':'X';
    //update nextPlayer
    newState.currentPlayer = nextPlayer;
      //update the board
    newState.board[row][col] = gameState.currentPlayer;


        //check if any rows are filled
        for(let i=0; i < 3;++i) {
             winner = newState.board[0].every(cell => cell === "X") || newState.board[0].every(cell => cell === "O");
        }

         const firstCol: string[] = [];
        //check if columns are filled
       for(let z = 0; z < 3; ++z) {
            for (let i=0; i < 3; ++i) {
            //fill in a temp array of col vals per row
            firstCol.push(newState.board[i][z]);
            
            
        }
        if(firstCol.every(cell => cell === "X") || firstCol.every(cell => cell === "O") ) {
           winner = true;
           newState.isGameOver = winner;
           return newState;

        }
    }
    //check if diagonal is filled- push diagonal into array, check values
    //checking L -> R
        const secondCol: string[] = [];
       for(let i=0; i < 3; i++){
        secondCol.push(newState.board[i][i]);
       }
       winner = (secondCol.every(cell => cell === "X") || secondCol.every(cell => cell === "O"));
       if(winner){
        newState.isGameOver = winner;
           return newState;

       }
       //very messy way to check R -> L
       const diagCol:string[] = [];
       diagCol.push(newState.board[0][2]);
       diagCol.push(newState.board[1][1]);
       diagCol.push(newState.board[2][0]);
       if(diagCol.every(cell => cell === "X") || diagCol.every(cell => cell === "O")) {
        winner = true;
        newState.isGameOver = winner;
           return newState;
    }

        //check if board is full, for a draw     
    newState.isGameOver = winner;
    // (hint) 3. detect a winner?
 return newState;
}