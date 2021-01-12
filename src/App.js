import React, { Component } from "react";
import colorPallets from "./utilities/seedColors";
import Pallete from "./components/Pallete";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pallete pallete={colorPallets[1]} />
      </div>
    );
  }
}

export default App;
