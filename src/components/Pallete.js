import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import SnackBar from "./SnackBar";
import generateScaledPallete from "../utilities/scaleColors";
import classes from "../stylesheets/Pallete.module.css";

class Pallete extends Component {
  constructor() {
    super();
    this.state = {
      copiedColor: "",
      scaleValue: 8,
      isVisible: false,
      snackbarText: "",
      snackbarStatus: "failure",
    };
    this.setCopiedColor = this.setCopiedColor.bind(this);
    this.setScaleValue = this.setScaleValue.bind(this);
    this.setSnackbarVisible = this.setSnackbarVisible.bind(this);
  }

  setCopiedColor(code) {
    this.setState({ copiedColor: code }, () => {
      setTimeout(() => this.setState({ copiedColor: "" }), 1000);
    });
  }

  setScaleValue(value) {
    this.setState({ scaleValue: parseInt(value) });
  }

  setSnackbarVisible(content, status) {
    this.setState(
      { isVisible: true, snackbarText: content, snackbarStatus: status },
      () => {
        setTimeout(
          () => this.setState({ isVisible: false, snackbarText: "" }),
          3500
        );
      }
    );
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
              showSnackbar={this.setSnackbarVisible}
              key={color.name}
            />
          ))}
        </div>

        <div className={`${classes["overlay-text"]} ${overlayShowClass}`}>
          <h1>Copied !</h1>
          <h3>{this.state.copiedColor}</h3>
        </div>

        <SnackBar
          content={this.state.snackbarText}
          show={this.state.isVisible}
          status={this.state.snackbarStatus}
        />
      </div>
    );
  }
}

export default Pallete;
