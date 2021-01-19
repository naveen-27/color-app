import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

class Footer extends Component {
  constructor() {
    super();
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const Footer = styled.footer`
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      padding: 0 2rem;
      color: rgb(35, 49, 64);
      gap: 1rem;
      word-spacing: 3px;

      & > button {
        outline: none;
        border: none;
        padding: 0.35rem 1rem;
        font-family: inherit;
        font-weight: 600;
        font-size: 1rem;
        background-color: #324456;
        color: #edf1f2;
        border-radius: 0.5rem;
        transition: background-color 150ms ease;

        &:hover {
          background-color: #954ab2;
        }
      }
    `;

    return (
      <Footer>
        <button onClick={this.goBack}>Go Back</button>

        <div>
          {this.props.content} <span>{this.props.emoji}</span>
        </div>
      </Footer>
    );
  }
}

export default withRouter(Footer);
