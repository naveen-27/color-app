import React, { PureComponent } from "react";
import styled from "styled-components";
import { SortableElement } from "react-sortable-hoc";
import { ReactComponent as Delete } from "../images/delete.svg";
import getContrastColor from "../utilities/luminance";

const Box = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &:hover svg {
    fill: #ffffff;
  }
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem 1rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > svg {
    transition: fill 200ms ease-in;
  }
`;

class DraggableColorBox extends PureComponent {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.delete(this.props.name);
  }

  render() {
    const { hex, name } = this.props;

    const Text = styled.span`
      text-transform: uppercase;
      color: ${getContrastColor(hex)};
      font-size: 0.85rem;
    `;

    return (
      <Box style={{ backgroundColor: hex }}>
        <Info>
          <Text>{name}</Text>
          <Delete
            style={{ width: "25px", height: "20px" }}
            onClick={this.delete}
          />
        </Info>
      </Box>
    );
  }
}

export default SortableElement(DraggableColorBox);
