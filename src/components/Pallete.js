import React, { Component } from "react";
import ColorBox from "./ColorBox";
import classes from "../stylesheets/Pallete.module.css";

class Pallete extends Component {
  constructor() {
    super();
    this.state = {
      copiedColor: "",
    };
    this.setCopiedColor = this.setCopiedColor.bind(this);
  }

  setCopiedColor(code) {
    this.setState({ copiedColor: code }, () => {
      setTimeout(() => this.setState({ copiedColor: "" }), 1000);
    });
  }

  render() {
    const pallete = this.props.pallete;

    return (
      <div className={classes["pallete-wrapper"]}>
        <div className={classes.Pallete}>
          {pallete.colors.map((color) => (
            <ColorBox
              name={color.name}
              code={color.color}
              copiedClass={classes["show-msg"]}
              setCopiedColor={this.setCopiedColor}
              key={color.name}
            />
          ))}
        </div>

        <div
          className={`${classes["overlay-text"]} ${
            this.state.copiedColor === "" ? "" : classes.show
          }`}
        >
          <h1>Copied !</h1>
          <h3>{this.state.copiedColor}</h3>
        </div>
      </div>
    );
  }
}

export default Pallete;
