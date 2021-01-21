import React, { Component } from "react";
import { Link } from "react-router-dom";
import seededPalettes from "../utilities/seedColors";
import MiniPalette from "./MiniPalette";
import classes from "../stylesheets/Home.module.css";

class Home extends Component {
  render() {
    return (
      <div className={classes.Home}>
        <header>
          <h1 className={classes.Logo}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </header>

        <main className={classes.MiniPalettes}>
          {seededPalettes.map((palette) => (
            <MiniPalette palette={palette} key={palette.id} />
          ))}
        </main>
      </div>
    );
  }
}

export default Home;
