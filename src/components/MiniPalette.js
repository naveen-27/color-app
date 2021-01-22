import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Delete } from "../images/delete.svg";
import classes from "../stylesheets/MiniPalette.module.css";

class MiniPalette extends Component {
  render() {
    const palette = this.props.palette;

    return (
      <div className={classes.MiniPalette}>
        <div className={classes["inner-palette"]}>
          {palette.colors.map((color) => (
            <div
              className={classes.box}
              key={color.name}
              style={{ backgroundColor: color.color }}
            ></div>
          ))}
        </div>

        <Link className={classes.info} to={`/palette/${palette.id}`}>
          <h4>{palette.paletteName}</h4>
          <span>{palette.emoji}</span>
        </Link>

        <div className={classes["delete-btn"]}>
          <Delete />
        </div>
      </div>
    );
  }
}

export default MiniPalette;
