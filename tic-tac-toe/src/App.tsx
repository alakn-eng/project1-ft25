import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {add, makeMove} from '../gamelogic/tictactoe'
import type {GameState} from '../gamelogic/tictactoe'
import { defaultGameState } from '../gamelogic/tictactoe'

function App() {
  const [game,setGame] = useState<GameState>(defaultGameState);

  function buttonClicked(gameState: GameState, row: number, col: number) {
      // 1. change game state
      const newGameState = makeMove(gameState, row, col);
      // 2. call setGame(newGameState)
      
      setGame(newGameState);
  }

  //takes in a pre-defined row and column, returns one call to function buttonClicked, taking in row and col
  function Cell(props: { row: number, col: number}) {
    return (
      <button onClick={() => buttonClicked(game, props.row, props.col)}>Move: {game.board[props.row][props.col]}</button>
    )
  }
  return (
    <>
      <div>
        <div>
            <Cell row={0} col={0}></Cell>
            <Cell row={0} col={1}></Cell>
            <Cell row={0} col={2}></Cell>
        </div>
        <div>
            <Cell row={1} col={0}></Cell>
            <Cell row={1} col={1}></Cell>
            <Cell row={1} col={2}></Cell>
        </div>
        <div>
           <Cell row={2} col={0}></Cell>
            <Cell row={2} col={1}></Cell>
            <Cell row={2} col={2}></Cell>
        </div>
      </div>
    </>
  )
}

export default App
