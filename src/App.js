import React, { Component } from "react";
import colorPaletts from "./utilities/seedColors";
import Pallete from "./components/Pallete";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pallete palette={colorPaletts[1]} />
      </div>
    );
  }
}

export default App;
