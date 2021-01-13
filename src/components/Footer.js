import React, { Component } from "react";

class Footer extends Component {
  render() {
    const styles = {
      height: "40px",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      fontWeight: "600",
      padding: "0 2rem",
      color: "rgb(35, 49, 64)",
      gap: "1rem",
      wordSpacing: "3px",
    };

    return (
      <footer style={styles}>
        {this.props.content} <span>{this.props.emoji}</span>
      </footer>
    );
  }
}

export default Footer;
