import React, { Component } from "react";
import { getDateFromWeek, filterUpdate } from "../../utility";
import userInterfaceStore from "../../../store/userInterfaceStore";

class SalmonTable extends Component {
  constructor(props) {
    super(props);
    this.state = { salmonType: 0 };
    this.updateUserInterface = this.updateUserInterface.bind(this);
  }

  componentWillMount() {
    userInterfaceStore.subscribe(this.updateUserInterface);
    let userInterface = userInterfaceStore.getInterface();
    this.setState(filterUpdate(userInterface, this.state));
  }

  componentWillUnmount() {
    userInterfaceStore.unsubscribe(this.updateUserInterface);
  }

  updateUserInterface() {
    var userInterface = userInterfaceStore.getInterface();
    this.setState(filterUpdate(userInterface, this.state));
  }

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
              if (
                this.state.salmonType === 0
                  ? i < this.props.data.value.length / 2
                  : i >= this.props.data.value.length / 2
              )
                if (i % 2 === 0)
                  return (
                    <tr key={i}>
                      <td>{e} tonn</td>
                      <td>{this.props.data.value[i + 1]} kr</td>
                      <td>
                        {i < this.props.data.value.length / 2
                          ? "Fersk laks"
                          : "Frosen laks"}
                      </td>
                      <td>
                        {getDateFromWeek(
                          time[i / 2].slice(5),
                          time[i / 2].slice(0, 4)
                        )}
                      </td>
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
