import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SnackBar from "./SnackBar";
import generateScaledPalette from "../utilities/scaleColors";
import classes from "../stylesheets/Palette.module.css";

class Palette extends Component {
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
    const palette = this.props.palette;
    const overlayShowClass = this.state.copiedColor === "" ? "" : classes.show;
    const scaledpalette = generateScaledPalette(palette);

    const paletteToRender = [];

    for (let scaledColors of scaledpalette) {
      paletteToRender.push(scaledColors[this.state.scaleValue - 1]);
    }

    return (
      <div className={classes["palette-wrapper"]}>
        <Navbar setScaleValue={this.setScaleValue} />

        <div className={classes.Palette}>
          {paletteToRender.map((color) => (
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

        <Footer content={palette.paletteName} emoji={palette.emoji} />
      </div>
    );
  }
}

export default Palette;
