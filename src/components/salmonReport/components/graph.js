import React, { Component } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { getDateFromWeek, computeData, filterUpdate } from "../../utility";
import * as moment from "moment";
import * as _ from "lodash";
import "moment/locale/nb";
import userInterfaceStore from "../../../store/userInterfaceStore";

class SalmonGraph extends Component {
  constructor(props) {
    super(props);
    this.state = { timespan: 365, salmonType: 0 };
    this.dateFormat = this.dateFormat.bind(this);
    this.updateUserInterface = this.updateUserInterface.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  dateFormat(date) {
    return moment.unix(date).format("LL");
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

  handleOnClick(e) {
    var object = {
      name: e.target.name,
      value: parseInt(e.target.value, 10)
    };
    userInterfaceStore.updateInterface(object);
  }

  render() {
    const data = computeData(
      this.props.data,
      this.props.data.dimension.Tid.category.label,
      this.state.timespan
    );

    return (
      <div className="salmon-graph">
        <div className="graph-tools">
          <h3>
            Pris per kg.{" "}
            {this.state.salmonType === 0 ? "Fersk laks" : "Frossen laks"}
          </h3>
          <div className="timespan-buttons">
            <button onClick={this.handleOnClick} value="365" name="timespan">
              1 år
            </button>
            <button onClick={this.handleOnClick} value="730" name="timespan">
              2 år
            </button>
            <button onClick={this.handleOnClick} value="1825" name="timespan">
              5 år
            </button>
            <button onClick={this.handleOnClick} value="3650" name="timespan">
              10 år
            </button>
            <button onClick={this.handleOnClick} value="10000" name="timespan">
              Alle år
            </button>
          </div>
        </div>
        <ResponsiveContainer>
          <ComposedChart
            width={600}
            height={400}
            data={data}
            margin={{ right: 20, left: 20, bottom: 60 }}
          >
            <Legend />
            <XAxis dataKey="time" tickFormatter={this.dateFormat} />
            <YAxis
              yAxisId="left"
              tickCount={10}
              domain={[0, "auto"]}
              unit=" kr"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickCount={10}
              domain={[0, "auto"]}
              unit=" tonn"
            />
            <Tooltip labelFormatter={this.dateFormat} />
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <Bar
              dataKey="volume"
              barSize={10}
              fill="#413ea0"
              unit=" tonn"
              yAxisId="right"
              name="Volum i tonn"
            />
            />
            <Line
              type="basis"
              dataKey="price"
              strokeWidth={3}
              stroke="#ff7300"
              dot={false}
              unit=" kr"
              yAxisId="left"
              name="Pris per kg i kroner"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default SalmonGraph;
