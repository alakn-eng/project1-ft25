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

// function: give me a board, and a location that I clicked
// return a new state of the game
export function makeMove(gameState: GameState, row: number, col: number): GameState {
    const newState = structuredClone(gameState)
  
    //update currentPlayer- if current player is X, update currentPlayer to O, otherwise keep as X
    const nextPlayer = newState.currentPlayer === 'X'?'O':'X';
    //update nextPlayer
    newState.currentPlayer = nextPlayer;
      //update the board
    newState.board[row][col] = gameState.currentPlayer;

    //check for three in a row, column, diagonal
    //most inefficient way: check if array element next to current player is the same 
    while(isGameOver== false) {
        if(board.some(row => row.every(cell => cell === 'X'))){

            
        }
          
        

    }

    // (hint) 3. detect a winner?
 return newState;
}