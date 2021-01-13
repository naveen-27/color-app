import React, { Component } from "react";
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
      await navigator.clipboard.writeText(this.props.code);
      this.showAnimation();
    } catch (err) {
      this.props.showSnackbar("Failed To Copy. Try Again 😬", "failure");
    }
  }

  showAnimation() {
    this.setState({ isColorCopied: true }, () => {
      setTimeout(() => this.setState({ isColorCopied: false }), 1000);
    });
    this.props.setCopiedColor(this.props.code);
  }

  render() {
    const { name: color, code } = this.props;
    const overShowClass = this.state.isColorCopied ? classes.copied : "";

    return (
      <div
        className={classes.ColorBox}
        style={{ backgroundColor: code }}
        tabIndex="0"
      >
        <button
          className={classes["box-btn"]}
          onClick={this.copyColorToClipboard}
        >
          COPY
        </button>
        <div className={classes.boxBottom}>
          <span className={classes["color-name"]}>{color}</span>
          <div className={classes.link}>MORE</div>
        </div>

        <div
          className={`${classes.overlay} ${overShowClass}`}
          style={{ backgroundColor: code }}
        ></div>
      </div>
    );
  }
}

export default ColorBox;
