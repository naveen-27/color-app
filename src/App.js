import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import colorPalettes from "./utilities/seedColors";
import Palette from "./components/Pallete";
import { scaleIndiviualColor } from "./utilities/scaleColors";

class App extends Component {
  generatePalette(routeParams) {
    const paletteId = routeParams.match.params.id;
    const foundPalette = colorPalettes.find(
      (palette) => palette.id === paletteId
    );

    return <Palette palette={foundPalette} isSinglePalette={false} />;
  }

  getScaledPalette(routeParams) {
    const { paletteId, colorId } = routeParams.match.params;
    const foundPalette = colorPalettes.find(
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

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
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
