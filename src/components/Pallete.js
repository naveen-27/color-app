import React, { Component } from "react";
import Palletes from "../utilities/seedColors";
import ColorBox from "./ColorBox";

class Pallete extends Component {
  render() {
    return Palletes[0].colors.map((color, idx) => (
      <ColorBox name={color.name} code={color.color} key={idx} />
    ));
  }
}

export default Pallete;
