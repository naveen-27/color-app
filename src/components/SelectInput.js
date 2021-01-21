import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class SelectInput extends Component {
  constructor() {
    super();
    this.state = {
      format: "hex-hash",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.setColorFormat(e.target.value);
    this.setState({ format: e.target.value });
    this.props.showSnackbar("Color Format Changed! 😎", "Success");
  }

  render() {
    return (
      <FormControl style={{ marginLeft: "auto" }}>
        <Select
          laria-label="color-format"
          id="demo-simple-select"
          value={this.state.format}
          onChange={this.handleChange}
        >
          <MenuItem value={"rgb"}>rgb - rgb(123, 215, 12)</MenuItem>
          <MenuItem value={"hex-hash"}>Hex - #fd51ce</MenuItem>
          <MenuItem value={"hex"}>Hex - fd51ce</MenuItem>
        </Select>
      </FormControl>
    );
  }
}

export default SelectInput;
