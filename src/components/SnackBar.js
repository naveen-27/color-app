import React, { Component } from "react";
import classes from "../stylesheets/SnackBar.module.css";

class SnackBar extends Component {
  render() {
    const showClass = this.props.show ? classes.show : "";
    const statusClass =
      this.props.status === "failure" ? classes.failure : classes.success;

    return (
      <div className={`${classes.Snackbar} ${showClass} ${statusClass}`}>
        {this.props.content}
      </div>
    );
  }
}

export default SnackBar;
