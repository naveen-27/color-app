import React, { Component } from "react";

class ColorBox extends Component {
  render() {
    const { name: color, code } = this.props;

    return (
      <div className="ColorBox" style={{ backgroundColor: code }}>
        {color}
      </div>
    );
  }
}

export default ColorBox;
