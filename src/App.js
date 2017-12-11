import React, { Component } from "react";
import "./App.css";

import Error from "./components/error/";
import SalmonReport from "./components/salmonReport/";

import axios from "axios";
import * as _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: [],
      error: [],
      fetching: true,
      fetched: false,
    };
  }

  componentDidMount() {
    axios
      .get("https://data.ssb.no/api/v0/dataset/1122.json?lang=en")
      .then(res =>
        this.setState({
          dataset: res.data.dataset,
          fetched: true,
          fetching: false
        })
      )
      .catch(err => {
        this.setState({ error: err, fetched: false, fetching: false });
      });
  }

  render() {
    if (this.state.fetched && !this.state.fetching) {
      return (
        <div className="App">
          {!_.isEmpty(this.state.error) ? (
            <Error error={this.state.error} />
          ) : (
            <SalmonReport data={this.state.dataset} />
          )}
        </div>
      );
    } else {
      return <h1>Laster</h1>;
    }
  }
}

export default App;
