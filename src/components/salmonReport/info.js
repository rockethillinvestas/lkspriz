import React, { Component } from "react";

class SalmonInfo extends Component {
  calculateChange() {
    var y2 = this.props.data.value[this.props.data.value.length / 2 - 1];
    var y1 = this.props.data.value[this.props.data.value.length / 2 - 3];
    var result = (y2 - y1) / y1 * 100;
    var rounded = parseFloat(result.toFixed(2));
    return (
      <h2 style={rounded > 0 ? { color: "green" } : { color: "red" }}>
        {rounded}%
      </h2>
    );
  }
  render() {
    var time = Object.keys(this.props.data.dimension.Tid.category.label);
    var year = time[time.length - 1].slice(0, 4);
    var week = time[time.length - 1].slice(5);
    var formattedTime = `Uke ${week} - ${year}`;
    return (
      <div className="salmon-info">
        <div className="last-price">
          <h3>Siste pris:</h3>
          <h2>
            {this.props.data.value[this.props.data.value.length / 2 - 1]} kr per
            kg
          </h2>
        </div>
        <div className="last-volume">
          <h3>Siste volum:</h3>
          <h2>
            {this.props.data.value[this.props.data.value.length / 2 - 2]} tonn
          </h2>
        </div>
        <div className="last-report">
          <h3>Siste rapportering:</h3>
          <h2>{formattedTime}</h2>
        </div>
        <div className="change">
          <h3>Forandring fra forrige uke</h3>
          {this.calculateChange()}
        </div>
      </div>
    );
  }
}

export default SalmonInfo;
