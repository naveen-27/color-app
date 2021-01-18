import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import colorPalettes from "./utilities/seedColors";
import Palette from "./components/Pallete";

class App extends Component {
  generatePalette(routeParams) {
    const paletteId = routeParams.match.params.id;
    const foundPalette = colorPalettes.find(
      (palette) => palette.id === paletteId
    );
    return <Palette palette={foundPalette} />;
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/palette/:id" render={this.generatePalette} />
        </Switch>
      </div>
    );
  }
}

export default App;
