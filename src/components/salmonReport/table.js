import React, { Component } from "react";

class SalmonTable extends Component {
  render() {
    var time = Object.keys(this.props.data.dimension.Tid.category.label);
    time.push.apply(
      time,
      Object.keys(this.props.data.dimension.Tid.category.label)
    );
    return (
      <div className="salmon-table">
        <table>
          <thead>
            <tr>
              <th>Volum</th>
              <th>Kilopris</th>
              <th>Varegruppe</th>
              <th>Tid</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.value.map((e, i) => {
              if (i % 2 === 0)
                return (
                  <tr key={i}>
                    <td>{e} tonn</td>
                    <td>{this.props.data.value[i + 1]} kr</td>
                    <td>
                      {i < this.props.data.value.length / 2
                        ? "Fersk oppalen laks"
                        : "Frosen oppalen laks"}
                    </td>
                    <td>{time[i / 2]}</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SalmonTable;
