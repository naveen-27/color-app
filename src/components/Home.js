import React, { Component } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MiniPalette from "./MiniPalette";
import classes from "../stylesheets/Home.module.css";

class Home extends Component {
  render() {
    return (
      <motion.div exit={{ opacity: 0 }}>
        <div className={classes.Home}>
          <header>
            <h1 className={classes.Logo}>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </header>

          <main className={classes.MiniPalettes}>
            {this.props.palettes.map((palette) => (
              <MiniPalette
                palette={palette}
                key={palette.id}
                deletePalette={this.props.deletePalette}
              />
            ))}
          </main>
        </div>
      </motion.div>
    );
  }
}

export default Home;
