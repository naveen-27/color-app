import React, { Component } from "react";
import { ReactComponent as Add } from "../images/add.svg";
import Button from "@material-ui/core/Button";
import classes from "../stylesheets/NewPaletteHeader.module.css";

class NewPaletteHeader extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleForm();
  }

  render() {
    return (
      <header className={classes.Header}>
        <div className={classes.new}>
          {!this.props.isDrawerOpen && (
            <div
              className={classes["add-btn"]}
              onClick={this.handleClick}
              role="button"
              aria-label="color picker form"
            >
              <Add className={classes.add} />
            </div>
          )}
          <h3 className={classes.label}>Create A Palette</h3>
        </div>

        <div className={classes["btn-group"]}>
          <Button variant="contained" color="primary">
            GO BACK
          </Button>
          <Button variant="contained" color="secondary">
            SAVE PALETTE
          </Button>
        </div>
      </header>
    );
  }
}

export default NewPaletteHeader;
