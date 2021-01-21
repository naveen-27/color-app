import React, { Component } from "react";
import Header from "./NewPaletteHeader";
import Drawer from "./Drawer";

class CreatePalette extends Component {
  constructor() {
    super();
    this.state = {
      isDrawerOpen: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    document.body.classList.toggle("blur");
  }

  render() {
    const style = {
      filter: this.state.isDrawerOpen ? "blur(2px)" : "none",
    };
    return (
      <>
        <div style={style}>
          <Header toggleForm={this.toggleDrawer} />
        </div>
        <Drawer open={this.state.isDrawerOpen} toggleForm={this.toggleDrawer} />
      </>
    );
  }
}

export default CreatePalette;
