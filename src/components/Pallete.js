import React, { Component } from "react";
import ColorBox from "./ColorBox";
import classes from "../stylesheets/Pallete.module.css";

class Pallete extends Component {
  render() {
    const pallete = this.props.pallete;

    return (
      <div className={classes.Pallete}>
        {pallete.colors.map((color) => (
          <ColorBox name={color.name} code={color.color} key={color.name} />
        ))}
      </div>
    );
  }
}

export default Pallete;
