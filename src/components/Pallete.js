import React, { Component } from "react";
import { motion } from "framer-motion";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SnackBar from "./SnackBar";
import ErrorRoute from "./ErrorRoute";
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
      copyFormat: "hex-hash",
    };
    this.setCopiedColor = this.setCopiedColor.bind(this);
    this.setScaleValue = this.setScaleValue.bind(this);
    this.setSnackbarVisible = this.setSnackbarVisible.bind(this);
    this.setCopyFormat = this.setCopyFormat.bind(this);
  }

  setCopiedColor(code) {
    this.setState({ copiedColor: code }, () => {
      setTimeout(() => this.setState({ copiedColor: "" }), 950);
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

  setCopyFormat(format) {
    this.setState({ copyFormat: format });
  }

  render() {
    const palette = this.props.palette;
    const overlayShowClass = this.state.copiedColor === "" ? "" : classes.show;
    let colorBoxes;

    if (!palette) {
      return <ErrorRoute />;
    }

    if (this.props.isSinglePalette) {
      colorBoxes = palette.scaledColors.colors.map((color) => (
        <ColorBox
          name={color.name}
          rgb={color.rgb}
          hex={color.hex}
          copyFormat={this.state.copyFormat}
          setCopiedColor={this.setCopiedColor}
          showSnackbar={this.setSnackbarVisible}
          key={color.name}
          isMoreHidden={true}
        />
      ));
    } else {
      const scaledPalette = generateScaledPalette(palette);
      const paletteToRender = [];

      for (let scaledColors of scaledPalette) {
        let indiviualColor = {
          id: scaledColors.id,
          colors: scaledColors.colors[this.state.scaleValue - 1],
        };
        paletteToRender.push(indiviualColor);
      }

      colorBoxes = paletteToRender.map((color) => (
        <ColorBox
          paletteId={palette.id}
          colorId={color.id}
          name={color.colors.name}
          rgb={color.colors.rgb}
          hex={color.colors.hex}
          copyFormat={this.state.copyFormat}
          setCopiedColor={this.setCopiedColor}
          showSnackbar={this.setSnackbarVisible}
          key={color.id}
        />
      ));
    }

    return (
      <motion.div exit={{ opacity: 0 }}>
        <div className={classes["palette-wrapper"]}>
          <Navbar
            setScaleValue={this.setScaleValue}
            setColorFormat={this.setCopyFormat}
            showSnackbar={this.setSnackbarVisible}
            isRangeHidden={this.props.isSinglePalette}
          />

          <div className={classes.Palette}>{colorBoxes}</div>

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
      </motion.div>
    );
  }
}

export default Palette;
