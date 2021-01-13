import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import generateScaledPallete from "../utilities/scaleColors";
import classes from "../stylesheets/Pallete.module.css";

class Pallete extends Component {
  constructor() {
    super();
    this.state = {
      copiedColor: "",
      scaleValue: 8,
    };
    this.setCopiedColor = this.setCopiedColor.bind(this);
    this.setScaleValue = this.setScaleValue.bind(this);
  }

  setCopiedColor(code) {
    this.setState({ copiedColor: code }, () => {
      setTimeout(() => this.setState({ copiedColor: "" }), 1000);
    });
  }

  setScaleValue(value) {
    this.setState({ scaleValue: parseInt(value) });
  }

  render() {
    const pallete = this.props.pallete;
    const overlayShowClass = this.state.copiedColor === "" ? "" : classes.show;
    const scaledPallete = generateScaledPallete(pallete);

    const palleteToRender = [];

    for (let scaledColors of scaledPallete) {
      palleteToRender.push(scaledColors[this.state.scaleValue - 1]);
    }

    return (
      <div className={classes["pallete-wrapper"]}>
        <Navbar setScaleValue={this.setScaleValue} />

        <div className={classes.Pallete}>
          {palleteToRender.map((color) => (
            <ColorBox
              name={color.name}
              code={color.color}
              copiedClass={classes["show-msg"]}
              setCopiedColor={this.setCopiedColor}
              key={color.name}
            />
          ))}
        </div>

        <div className={`${classes["overlay-text"]} ${overlayShowClass}`}>
          <h1>Copied !</h1>
          <h3>{this.state.copiedColor}</h3>
        </div>
      </div>
    );
  }
}

export default Pallete;
