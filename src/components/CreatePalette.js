import React, { Component } from "react";
import Header from "./NewPaletteHeader";
import Drawer from "./Drawer";
import styled from "styled-components";

const PaletteWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${(props) =>
    props.children.props.isDrawerOpen ? "calc(100% - 335px)" : "100%"};
  transition: width 300ms ease;
`;

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
    return (
      <>
        <PaletteWrapper>
          <Header
            toggleForm={this.toggleDrawer}
            isDrawerOpen={this.state.isDrawerOpen}
          />
        </PaletteWrapper>

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
