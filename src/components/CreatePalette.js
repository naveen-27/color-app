import React, { Component } from "react";
import Header from "./NewPaletteHeader";
import Drawer from "./Drawer";
import DraggablePalette from "./DraggablePalette";
import PaletteMetaForm from "./PaletteMetaForm";
import { arrayMove } from "react-sortable-hoc";
import styled from "styled-components";
import palette from "../utilities/seedColors";

const PaletteWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: ${(props) =>
    props.children[0].props.isDrawerOpen ? "calc(100% - 335px)" : "100%"};
  transition: width 300ms ease;
`;

class CreatePalette extends Component {
  constructor() {
    super();
    this.state = {
      isDrawerOpen: false,
      colors: palette[0].colors,
      err: null,
      isFormOpen: false,
    };
    this.paletteRef = React.createRef();

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addColorToPalette = this.addColorToPalette.bind(this);
    this.validateColor = this.validateColor.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deleteColor = this.deleteColor.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.randomColor = this.randomColor.bind(this);
  }

  toggleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }

  addColorToPalette(newColor) {
    const [canColorBeAdded, err] = this.validateColor(newColor.name)(
      newColor.color
    )(this.state.colors.length);

    if (!canColorBeAdded) {
      this.setState({ err });
      return;
    }

    this.setState({ colors: [...this.state.colors, newColor], err: null });
  }

  validateColor(name) {
    const { colors } = this.state;
    let err;

    const isNameUnique = colors.every(
      (color) => color.name.toLocaleLowerCase() !== name.toLocaleLowerCase()
    );
    const isNameEmpty = name === "";
    if (!isNameUnique) err = "Name Already Exists";
    if (isNameEmpty) err = "Name Cannot Be Empty";

    return function (hex) {
      const isColorUnique = colors.every((color) => color.color !== hex);
      if (!err && !isColorUnique) err = "Color Already Exists";

      return function (size) {
        const isPaletteFull = size === 20;
        if (!err && isPaletteFull) err = "Palette Full";
        return [
          isNameUnique && isColorUnique && !isPaletteFull && !isNameEmpty,
          err,
        ];
      };
    };
  }

  deleteColor(colorName) {
    const colors = this.state.colors.filter(
      (color) => color.name !== colorName
    );
    this.setState({ colors });
  }

  clearPalette() {
    this.setState({ colors: [] });
  }

  randomColor() {
    let isColorUnique, isPaletteFull;
    isPaletteFull = this.state.colors.length === 20;

    do {
      let generatedColor = this.props.getRandomColor();
      isColorUnique = this.state.colors.every(
        (color) =>
          color.name.toLocaleLowerCase() !==
          generatedColor.name.toLocaleLowerCase()
      );

      if (isPaletteFull) {
        this.setState({ err: "Palettte Full" }, () => {
          setTimeout(() => this.setState({ err: null }), 1000);
        });
      }

      if (isColorUnique && !isPaletteFull) {
        this.setState({ colors: [...this.state.colors, generatedColor] });
      }
    } while (!isColorUnique);
  }

  savePalette(newPalette) {
    const updatedPalette = { ...newPalette, colors: this.state.colors };
    this.props.savePalette(updatedPalette);
  }

  toggleForm() {
    if (this.state.isFormOpen) {
      this.paletteRef.current.classList.remove("blur");
    } else {
      this.paletteRef.current.classList.add("blur");
    }
    this.setState({ isFormOpen: !this.state.isFormOpen, isDrawerOpen: false });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {
    return (
      <>
        <PaletteWrapper ref={this.paletteRef}>
          <Header
            toggleDrawer={this.toggleDrawer}
            isDrawerOpen={this.state.isDrawerOpen}
            toggleForm={this.toggleForm}
          />

          <DraggablePalette
            palette={this.state.colors}
            deleteColor={this.deleteColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={1}
          />
        </PaletteWrapper>

        <PaletteMetaForm
          isNameUnique={this.props.isNameUnique}
          savePalette={this.savePalette}
          toggleForm={this.toggleForm}
          isFormOpen={this.state.isFormOpen}
        />

        <Drawer
          open={this.state.isDrawerOpen}
          toggleForm={this.toggleDrawer}
          addColor={this.addColorToPalette}
          clearPalette={this.clearPalette}
          getRandomColor={this.randomColor}
          inputErr={this.state.err}
        />
      </>
    );
  }
}

export default CreatePalette;
