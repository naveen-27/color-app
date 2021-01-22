import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import colorPalettes from "./utilities/seedColors";
import Palette from "./components/Pallete";
import CreatePalette from "./components/CreatePalette";
import { scaleIndiviualColor } from "./utilities/scaleColors";

class App extends Component {
  constructor() {
    super();
    this.state = {
      palettes: JSON.parse(localStorage.getItem("palettes")) || colorPalettes,
    };
    this.savePalette = this.savePalette.bind(this);
    this.generatePalette = this.generatePalette.bind(this);
    this.getScaledPalette = this.getScaledPalette.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
    this.isPaletteNameUnique = this.isPaletteNameUnique.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  generatePalette(routeParams) {
    const paletteId = routeParams.match.params.id;
    const foundPalette = this.state.palettes.find(
      (palette) => palette.id === paletteId
    );

    return <Palette palette={foundPalette} isSinglePalette={false} />;
  }

  getScaledPalette(routeParams) {
    const { paletteId, colorId } = routeParams.match.params;
    const foundPalette = this.state.palettes.find(
      (palette) => palette.id === paletteId
    );
    const color = foundPalette.colors.find((color) => color.name === colorId);

    const singleScaledPalette = scaleIndiviualColor(color.color, color.name);

    const palette = {
      paletteName: foundPalette.paletteName,
      emoji: foundPalette.emoji,
      scaledColors: singleScaledPalette,
    };

    return <Palette palette={palette} isSinglePalette={true} />;
  }

  savePalette(newPalette) {
    const updatedPaletteList = [...this.state.palettes, newPalette];
    this.setState({ palettes: updatedPaletteList });
    localStorage.setItem("palettes", JSON.stringify(updatedPaletteList));
  }

  getRandomColor() {
    const palette = Math.floor(Math.random() * this.state.palettes.length);
    const color = Math.floor(
      Math.random() * this.state.palettes[palette].colors.length
    );
    return this.state.palettes[palette].colors[color];
  }

  isPaletteNameUnique(name) {
    return this.state.palettes.every(
      (palette) =>
        palette.paletteName.toLocaleLowerCase() !== name.toLocaleLowerCase()
    );
  }

  deletePalette(name) {
    const updatedPalettes = this.state.palettes.filter(
      ({ paletteName }) => paletteName !== name
    );
    this.setState({ palettes: updatedPalettes });
    localStorage.setItem("palettes", JSON.stringify(updatedPalettes));
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Home
                palettes={this.state.palettes}
                deletePalette={this.deletePalette}
              />
            )}
          />
          <Route
            exact
            path="/palette/new"
            component={() => (
              <CreatePalette
                savePalette={this.savePalette}
                getRandomColor={this.getRandomColor}
                isNameUnique={this.isPaletteNameUnique}
              />
            )}
          />
          <Route exact path="/palette/:id" render={this.generatePalette} />
          <Route
            exact
            path="/palette/:paletteId/:colorId"
            render={this.getScaledPalette}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
