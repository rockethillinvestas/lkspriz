import React, { Component } from "react";
import userInterfaceStore from "./../../store/userInterfaceStore";

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = { userInterface: {} };
    this.handleClick = this.handleClick.bind(this);
    this.updateInterface = this.updateInterface.bind(this);
  }

  componentWillMount() {
    userInterfaceStore.subscribe(this.updateInterface);
  }

  componentWillUnmount() {
    userInterfaceStore.unsubscribe(this.updateInterface);
  }

  updateInterface() {
    const userInterface = userInterfaceStore.getInterface();
    this.setState({ userInterface: userInterface });
  }

  handleClick(e) {
    var update = {
      name: e.target.name,
      value: e.target.checked
    };
    userInterfaceStore.updateInterface(update);
  }

  render() {
    return (
      <div className="toolbar">
        <div className="history">
          <p>
            Vis historie{" "}
            <input
              type="checkbox"
              checked={!!this.state.userInterface.tableVisible}
              name="tableVisible"
              onChange={this.handleClick}
            />
          </p>
        </div>
        <div className="graph">
          <p>
            Vis graf{" "}
            <input
              type="checkbox"
              checked={!!this.state.userInterface.graphVisible}
              name="graphVisible"
              onChange={this.handleClick}
            />
          </p>
        </div>
      </div>
    );
  }
}

export default Toolbar;
