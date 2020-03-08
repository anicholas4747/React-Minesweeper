import React from "react";
import Board from "./board";
let Minesweeper = require("../game_logic/minesweeper");

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Minesweeper.Board(9,10)
    };
    this.updateGame = this.updateGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.removeModal = this.removeModal.bind(this);

  }
  restartGame () {
    this.setState({
      board: new Minesweeper.Board(9, 10)
    });
  }

  updateGame(tile,flag){
    if (flag) {
      tile.toggleFlag();
    } else {
      tile.explore();
    }
    this.setState({
      board: this.state.board
    });
  }

  removeModal(event) {
    event.preventDefault();
    // debugger
    document.getElementsByClassName("modal")[0].style.display = 'none';
    document.getElementsByClassName("modal")[0].classList.remove("modal");
  }

  render() {

    let msg = null;
    if (this.state.board.won()) {
      msg = (
        <div className="modal">
          <div className="won">
            <h2 className="x-out" onClick={this.removeModal}>&times;</h2>
            <h1>CONGRATS, YOU WON!!</h1>
            <button className="replay" onClick={this.restartGame}>Play Again?</button>
          </div>
        </div>
      )
    } else if (this.state.board.lost()) {
      msg = (
        <div className="modal">
          <div className="lost">
            <h2 className="x-out" onClick={this.removeModal}>&times;</h2>
            <h1>AWWWW, YOU LOST 😭</h1>
            <button className="replay" onClick={this.restartGame}>Play Again?</button>
          </div>
        </div>
      )
    } else {
      msg = (
        null
      )
    }
    
    return (
      <div>
        <div className="headings">
          <h1>MineSweeper</h1>
          <p>(Hold Atl/Option to Flag)</p>
          <button className="replay" onClick={this.restartGame}>New Game</button>
          {msg}
          <br/>
          <br/>
        </div>
        <Board gameBoard={this.state.board} update={this.updateGame}/>
      </div>
    )
  }
}