import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ReactComponent as Close } from "../images/cancel.svg";
import classes from "../stylesheets/Drawer.module.css";

class Drawer extends Component {
  constructor() {
    super();
    this.state = {
      color: { hex: "#281392" },
      colorName: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.props.toggleForm();
  }

  handleColorChange(newColor) {
    this.setState({ color: newColor });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.addColor({
      color: this.state.color.hex.toLocaleUpperCase(),
      name: this.state.colorName,
    });
    this.setState({ colorName: "" });
  }

  handleChange(e) {
    this.setState({ colorName: e.target.value });
  }

  render() {
    const drawerClasses = `${classes.Drawer} ${
      this.props.open ? classes.open : ""
    }`;

    return (
      <aside className={drawerClasses}>
        <Close className={classes.close} onClick={this.handleClick} />

        <h2>DESIGN YOUR PALETTE</h2>

        <ChromePicker
          color={this.state.color.hsl}
          onChange={this.handleColorChange}
          width="100%"
        />

        <div className={classes["btn-grp"]}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.clearPalette}
          >
            CLEAR PALETTE
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.props.getRandomColor}
          >
            RANDOM COLOR
          </Button>
        </div>

        <form
          method="POST"
          className={classes.form}
          onSubmit={this.handleSubmit}
        >
          <TextField
            id="color-name"
            name="colorName"
            label="Color Name"
            variant="outlined"
            fullWidth={true}
            value={this.state.colorName}
            onChange={this.handleChange}
            error={this.props.inputErr !== null}
            helperText={this.props.inputErr}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth={true}
            style={{ backgroundColor: this.state.color.hex, color: "#ffffff" }}
          >
            Add Color
          </Button>
        </form>
      </aside>
    );
  }
}

export default Drawer;
