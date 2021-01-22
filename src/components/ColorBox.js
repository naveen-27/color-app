import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import getContrastColor from "../utilities/luminance";
import classes from "../stylesheets/ColorBox.module.css";

class ColorBox extends Component {
  constructor() {
    super();
    this.state = {
      isColorCopied: false,
    };
    this.copyColorToClipboard = this.copyColorToClipboard.bind(this);
    this.showAnimation = this.showAnimation.bind(this);
  }

  async copyColorToClipboard() {
    try {
      let copyText;
      switch (this.props.copyFormat) {
        case "hex-hash":
          copyText = this.props.hex;
          break;
        case "hex":
          copyText = this.props.hex.slice(1);
          break;
        default:
          copyText = this.props.rgb;
          break;
      }

      await navigator.clipboard.writeText(copyText);
      this.showAnimation(copyText);
    } catch (err) {
      console.log(err);
      this.props.showSnackbar("Failed To Copy. Try Again 😬", "failure");
    }
  }

  showAnimation(colorCopied) {
    this.setState({ isColorCopied: true }, () => {
      setTimeout(() => this.setState({ isColorCopied: false }), 1100);
    });
    this.props.setCopiedColor(colorCopied);
  }

  render() {
    const { name: color, hex, paletteId, colorId, isMoreHidden } = this.props;
    const overShowClass = this.state.isColorCopied ? classes.copied : "";

    const moreColors = (
      <Link className={classes.link} to={`/palette/${paletteId}/${colorId}`}>
        MORE
      </Link>
    );

    const ColorName = styled.span`
      padding: 0.5rem 1rem;
      color: ${getContrastColor(hex)};
      // color: #edf1f2;
      font-size: 0.85rem;
      font-weight: 500;
    `;

    return (
      <div
        className={classes.ColorBox}
        style={{ backgroundColor: hex }}
        tabIndex="0"
      >
        <button
          className={classes["box-btn"]}
          onClick={this.copyColorToClipboard}
        >
          COPY
        </button>
        <div className={classes.boxBottom}>
          <ColorName>{color}</ColorName>
          {!isMoreHidden && moreColors}
        </div>

        <div
          className={`${classes.overlay} ${overShowClass}`}
          style={{ backgroundColor: hex }}
        ></div>
      </div>
    );
  }
}

export default ColorBox;
