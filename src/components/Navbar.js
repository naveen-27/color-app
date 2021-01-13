import React, { Component } from "react";
import classes from "../stylesheets/Navbar.module.css";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      scaleValue: 8,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ scaleValue: e.target.value });
    this.props.setScaleValue(e.target.value);
  }

  render() {
    return (
      <header className={classes.Header}>
        <h1 className={classes.Logo}>
          react<span>colorpicker</span>
        </h1>

        <div className={classes.input}>
          <span>Level : {this.state.scaleValue}</span>
          <input
            className={classes.range}
            type="range"
            min="1"
            max="20"
            onChange={this.handleChange}
            value={this.state.scaleValue}
          />
        </div>
      </header>
    );
  }
}

export default Navbar;
