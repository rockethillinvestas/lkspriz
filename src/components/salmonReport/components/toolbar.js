import React, { Component } from "react";
import userInterfaceStore from "./../../../store/userInterfaceStore";
import * as _ from "lodash";
import { filterUpdate } from "../../utility";
import Changes from "./changes";

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
    var userInterface = userInterfaceStore.getInterface();
    this.setState(filterUpdate(userInterface, this.state));
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
        <div className="change-bar">
          <Changes data={this.props.data} weeks={10} />
          <Changes data={this.props.data} weeks={20} />
          <Changes data={this.props.data} weeks={30} />
          <Changes data={this.props.data} weeks={52} />
        </div>
        <div className="history">
          <p>
            Vis historie{" "}
            <input
              type="checkbox"
              checked={!!this.state.tableVisible}
              name="tableVisible"
              onChange={this.handleClick}
            />
          </p>
        </div>
        {/*         <div className="graph">
          <p>
            Vis graf{" "}
            <input
              type="checkbox"
              checked={!!this.state.userInterface.graphVisible}
              name="graphVisible"
              onChange={this.handleClick}
            />
          </p>
        </div> */}
      </div>
    );
  }
}

export default Toolbar;
