import React, { Component } from "react";

import SalmonTable from "./components/table";
import SalmonGraph from "./components/graph";
import SalmonInfo from "./components/info";
import Toolbar from "./components/toolbar";

import * as _ from "lodash";
import userInterfaceStore from "./../../store/userInterfaceStore";
import { filterUpdate } from "../utility";

class SalmonReport extends Component {
  constructor(props) {
    super(props);
    this.state = { tableVisible: false };
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

  render() {
    return (
      <main className="salmon-report">
        <SalmonInfo data={this.props.data} />
        <SalmonGraph data={this.props.data} />
        <Toolbar data={this.props.data} />
        {this.state.tableVisible ? <SalmonTable data={this.props.data} /> : ""}
      </main>
    );
  }
}

export default SalmonReport;
