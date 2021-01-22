import React, { Component } from "react";
import { SortableContainer } from "react-sortable-hoc";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DraggableColorBox from "./DraggableColorBox";
import classes from "../stylesheets/DraggablePalette.module.css";

class DraggablePalette extends Component {
  render() {
    const { palette } = this.props;

    return (
      <TransitionGroup className={classes.Palette}>
        {palette.map((color, idx) => (
          <CSSTransition key={color.name} timeout={500} classNames="fade">
            <DraggableColorBox
              index={idx}
              name={color.name}
              hex={color.color}
              key={color.name}
              delete={this.props.deleteColor}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}

export default SortableContainer(DraggablePalette);
