import React, { Component } from "react";
import styled from "styled-components";

class Footer extends Component {
  render() {
    const Footer = styled.footer`
      height: 40px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-weight: 600;
      padding: 0 2rem;
      color: rgb(35, 49, 64);
      gap: 1rem;
      word-spacing: 3px;
    `;

    return (
      <Footer>
        {this.props.content} <span>{this.props.emoji}</span>
      </Footer>
    );
  }
}

export default Footer;
