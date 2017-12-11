import React, { Component } from "react";
import SalmonTable from "./table";
import SalmonGraph from './graph';
import SalmonInfo from './info';
import Toolbar from './toolbar';

import userInterfaceStore from './../../store/userInterfaceStore';

class SalmonReport extends Component {
  constructor (props) {
    super(props);
    this.state = {userInterface: {}};
    this.updateInterface = this.updateInterface.bind(this)
  }

  
  componentWillMount () {
    userInterfaceStore.subscribe(this.updateInterface);
  }
  
  
  componentWillUnmount () {
    userInterfaceStore.unsubscribe(this.updateInterface);
  }

  updateInterface(){
    var UI = userInterfaceStore.getInterface();
    this.setState({userInterface: UI});
  }
 
  render() {
    return (
      <div className="salmon-report">
        <h3>{this.props.data.label}</h3>
        <SalmonInfo data={this.props.data} />
        <Toolbar />
        {this.state.userInterface.tableVisible ? <SalmonTable data={this.props.data} />  : ''}  
        {this.state.userInterface.graphVisible ? <SalmonGraph data={this.props.data} />  : ''}  
      </div>
    );
  }
}

export default SalmonReport;
