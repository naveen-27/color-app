import React, { Component } from "react";
import DraggableColorBox from "./DraggableColorBox";
import classes from "../stylesheets/DraggablePalette.module.css";

class DraggablePalette extends Component {
  render() {
    const { palette } = this.props;

    return (
      <div className={classes.Palette}>
        {palette.map((color) => (
          <DraggableColorBox
            name={color.name}
            hex={color.color}
            key={color.name}
          />
        ))}
      </div>
    );
  }
}

export default DraggablePalette;
