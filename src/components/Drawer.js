import React, { Component } from "react";
import { ReactComponent as Close } from "../images/cancel.svg";
import classes from "../stylesheets/Drawer.module.css";

class Drawer extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleForm();
  }

  render() {
    const drawerClasses = `${classes.Drawer} ${
      this.props.open ? classes.open : ""
    }`;

    return (
      <aside className={drawerClasses}>
        <Close className={classes.close} onClick={this.handleClick} />
      </aside>
    );
  }
}

export default Drawer;
