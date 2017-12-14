import React, { Component } from "react";
import { calculateChange } from "../../utility";

class Changes extends Component {
  render() {
    var { percent } = calculateChange(this.props.data, this.props.weeks);
    return (
      <div className="change">
        <p style={percent > 0 ? { color: "green" } : { color: "red" }}>
          {percent}%
        </p>
      </div>
    );
  }
}

export default Changes;
