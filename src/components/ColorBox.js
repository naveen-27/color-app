import React, { Component } from "react";
import classes from "../stylesheets/ColorBox.module.css";

class ColorBox extends Component {
  constructor() {
    super();
    this.copyColorToClipboard = this.copyColorToClipboard.bind(this);
  }

  async copyColorToClipboard() {
    try {
      await navigator.clipboard.writeText(this.props.code);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { name: color, code } = this.props;

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
      </div>
    );
  }
}

export default ColorBox;
