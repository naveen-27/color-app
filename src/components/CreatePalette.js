import React, { Component } from "react";
import Header from "./NewPaletteHeader";
import Drawer from "./Drawer";

class CreatePalette extends Component {
  constructor() {
    super();
    this.state = {
      isDrawerOpen: false,
      colors: [],
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.addColorToPalette = this.addColorToPalette.bind(this);
  }

  toggleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    document.body.classList.toggle("blur");
  }

  addColorToPalette(newColor) {
    this.setState({ colors: [...this.state.colors, newColor] });
  }

  render() {
    const style = {
      filter: this.state.isDrawerOpen ? "blur(2px)" : "none",
      pointerEvents: this.state.isDrawerOpen ? "none" : "all",
    };

    return (
      <>
        <div style={style}>
          <Header toggleForm={this.toggleDrawer} />
        </div>
        <Drawer
          open={this.state.isDrawerOpen}
          toggleForm={this.toggleDrawer}
          addColor={this.addColorToPalette}
        />
      </>
    );
  }
}

export default CreatePalette;
