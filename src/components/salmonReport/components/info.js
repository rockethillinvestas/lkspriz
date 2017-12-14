import React, { Component } from "react";
import { getDateFromWeek, calculateChange, filterUpdate } from "../../utility";
import userInterfaceStore from "../../../store/userInterfaceStore";

class SalmonInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { salmonType: 0 };
    this.updateUserInterface = this.updateUserInterface.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentWillMount() {
    userInterfaceStore.subscribe(this.updateUserInterface);
  }

  componentWillUnmount() {
    userInterfaceStore.unsubscribe(this.updateUserInterface);
  }

  updateUserInterface() {
    var userInterface = userInterfaceStore.getInterface();
    this.setState(filterUpdate(userInterface, this.state));
  }

  calculateChange() {
    const { percent, valuta } = calculateChange(this.props.data, 2);
    return (
      <h2 style={percent > 0 ? { color: "#62c48b" } : { color: "#e04900" }}>
        {percent}% | {valuta}kr
      </h2>
    );
  }

  handleOnClick(e) {
    var object = {
      name: e.target.name,
      value: parseInt(e.target.value, 10)
    };
    userInterfaceStore.updateInterface(object);
  }

  render() {
    var time = Object.keys(this.props.data.dimension.Tid.category.label);
    var formattedTime = getDateFromWeek(
      time[time.length - 1].slice(5),
      time[time.length - 1].slice(0, 4)
    );
    return (
      <div className="salmon-info">
        <div className="salmontype-button">
          <ul>
            <li>
              <button
                className={`${this.state.salmonType === 0 ? "activated" : ""}`}
                onClick={this.handleOnClick}
                value="0"
                name="salmonType"
              >
                Fersk laks
              </button>
            </li>
            <li>
              <button
                className={`${this.state.salmonType === 1 ? "activated" : ""}`}
                onClick={this.handleOnClick}
                value="1"
                name="salmonType"
              >
                Frossen laks
              </button>
            </li>
          </ul>
        </div>
        <div className="last-price">
          <h3>Siste pris:</h3>
          <h2>
            {
              this.props.data.value[
                this.state.salmonType === 0
                  ? this.props.data.value.length / 2 - 1
                  : this.props.data.value.length - 1
              ]
            }{" "}
            kr per kg
          </h2>
        </div>
        <div className="last-volume">
          <h3>Siste volum:</h3>
          <h2>
            {
              this.props.data.value[
                this.state.salmonType === 0
                  ? this.props.data.value.length / 2 - 2
                  : this.props.data.value.length - 1
              ]
            }{" "}
            tonn
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
