import React from "react";

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "◻️"
    };
    this.updateStatus = this.updateStatus.bind(this);
  }

  updateStatus (event) {
    let flag = false;
    if(event.altKey) {
      flag = true;
    }
    this.props.update(this.props.tileObj,flag);
  }
  
  render() {
    let newStatus = "";
    let clicked = (this.props.tileObj.explored) ? "tiles clicked" : "tiles";

    if (this.props.tileObj.bombed && this.props.tileObj.explored) {
      newStatus = "💣";
      clicked = "clicked-bomb";
    } else if (this.props.tileObj.flagged) {
      newStatus = "🚩";
    } else if (this.props.tileObj.explored) {
      let num = "";
      switch (this.props.tileObj.adjacentBombCount()) {
        case 0:
          num = "◻️";
          clicked = "tiles nothing";
          break;
        case 1:
          num = "1️⃣";
          break;
        case 2:
          num = "2️⃣";
          break;
        case 3:
          num = "3️⃣";
          break;
        case 4:
          num = "4️⃣";
          break;
      }
      newStatus = num;
    } else {
      newStatus = "◻️";
    }
    

    return (
      <p className={clicked} onClick={this.updateStatus}>{newStatus}</p>
    )
  }
}