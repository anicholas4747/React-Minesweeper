import React from "react";
import Tile from "./tile";
// let Minesweeper = require("../game_logic/minesweeper");


export default class Board extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    const grid = this.props.gameBoard.grid.map((row, rowIdx) => {
      return row.map((tile, colIdx) => {
        let pos = [rowIdx, colIdx];
        return (
          <Tile 
            key={pos} 
            tileObj={tile}
            update={this.props.update}/>
        );
      });
    });

    
    return (
      <div className="board">
        <ul>
          {grid.map((row,idx)=>{
            return <li key={idx} className="row">{row}</li>
          })}
        </ul>
      </div>
    )
  }
}