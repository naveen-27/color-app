import React, { Component } from "react";
import classes from "../stylesheets/ColorBox.module.css";

class ColorBox extends Component {
  render() {
    const { name: color, code } = this.props;

    return (
      <div
        className={classes.ColorBox}
        style={{ backgroundColor: code }}
        tabIndex="0"
      >
        <button className={classes["box-btn"]}>COPY</button>
        <div className={classes.boxBottom}>
          <span className={classes["color-name"]}>{color}</span>
          <div className={classes.link}>MORE</div>
        </div>
      </div>
    );
  }
}

export default ColorBox;
