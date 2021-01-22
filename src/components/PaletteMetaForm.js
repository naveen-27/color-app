import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import classes from "../stylesheets/PaletteMetaForm.module.css";
import { withRouter } from "react-router-dom";

class PaletteMetaForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      emoji: "",
      formPos: 0,
      err: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const newPalette = {
      paletteName: this.state.name,
      id: this.state.name.toLocaleLowerCase().replace(" ", "-"),
      emoji: this.state.emoji,
    };
    this.props.savePalette(newPalette);
    this.setState({ name: "", emoji: "", formPos: 0, err: null });
    this.props.history.push("/");
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  next() {
    let err,
      { name } = this.state;

    if (name === "") {
      err = "Name Cannot Be Empty";
    } else if (!err && !this.props.isNameUnique(name)) {
      err = "Name Already Exists";
    }

    if (err) {
      this.setState({ err });
    } else {
      this.setState({ formPos: -1 });
    }
  }

  prev() {
    this.setState({ formPos: 0 });
  }

  render() {
    const nextBtn = (
      <Button variant="contained" color="primary" onClick={this.next}>
        Next
      </Button>
    );

    const prevBtn = (
      <Button variant="contained" onClick={this.prev}>
        Prev
      </Button>
    );

    const cancelBtn = (
      <Button variant="contained" onClick={this.props.toggleForm}>
        Cancel
      </Button>
    );

    const submitBtn = (
      <Button
        variant="contained"
        type="submit"
        color="primary"
        onClick={this.handleSubmit}
      >
        Submit
      </Button>
    );

    const formState = this.state.formPos;
    const formOpenClass = this.props.isFormOpen ? classes.open : "";

    return (
      <div className={`${classes.MetaForm} ${formOpenClass}`}>
        <h1 className={classes.title}>Name & Emoji The Palette</h1>

        <p className={classes["muted-text"]}>
          Pick a name and emoji for your palette. Make sure the name is unique.
        </p>

        <form
          method="POST"
          className={classes.form}
          onSubmit={this.handleSubmit}
        >
          <div
            className={classes.Inputs}
            style={{ transform: `translateX(${this.state.formPos * 100}%)` }}
          >
            <TextField
              id="palette-name"
              name="name"
              label="Palette Name"
              variant="outlined"
              fullWidth={true}
              value={this.state.name}
              onChange={this.handleChange}
              error={this.state.err !== null}
              helperText={this.state.err}
            />

            <TextField
              id="palette-emoji"
              name="emoji"
              label="Palette Emoji"
              variant="outlined"
              fullWidth={true}
              value={this.state.emoji}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className={classes["btn-grp"]}>
            {formState === -1 && prevBtn}
            {formState === -1 && submitBtn}
            {formState === 0 && cancelBtn}
            {formState === 0 && nextBtn}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(PaletteMetaForm);
