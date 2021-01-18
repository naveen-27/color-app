import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "../stylesheets/MiniPalette.module.css";

class MiniPalette extends Component {
  render() {
    const palette = this.props.palette;

    return (
      <Link className={classes.MiniPalette} to={`/palette/${palette.id}`}>
        <div className={classes["inner-palette"]}>
          {palette.colors.map((color) => (
            <div
              className={classes.box}
              key={color.name}
              style={{ backgroundColor: color.color }}
            ></div>
          ))}
        </div>

        <div className={classes.info}>
          <h4>{palette.paletteName}</h4>
          <span>{palette.emoji}</span>
        </div>
      </Link>
    );
  }
}

export default MiniPalette;
