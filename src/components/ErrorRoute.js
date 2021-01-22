import React, { Component } from "react";
import styled from "styled-components";

const Error = styled.div`
  height: 100vh;
  background-color: #bb3215;
  display: grid;
  place-items: center;
  text-align: center;

  & > h1 {
    background-color: rgba(255, 255, 255, 0.5);
    color: #34495e;
    text-transform: uppercase;
    width: 100%;
    font-size: 5rem;
    padding: 1rem;
    text-shadow: 5px 5px 0 rgba(0, 0, 0, 0.25);
  }
`;

class ErrorRoute extends Component {
  render() {
    return (
      <Error>
        <h1>404 - bad route</h1>
      </Error>
    );
  }
}

export default ErrorRoute;
