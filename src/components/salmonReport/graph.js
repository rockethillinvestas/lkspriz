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
import * as moment from "moment";

class SalmonGraph extends Component {
  constructor(props) {
    super(props);
    this.getDateFromWeek = this.getDateFromWeek.bind(this);
  }

  getDateFromWeek(week, year) {
    return moment()
      .day("Monday")
      .year(year)
      .week(week)
      .toDate();
  }

  render() {
    var time = Object.keys(this.props.data.dimension.Tid.category.label);
    var data = [];

    this.props.data.value.forEach((e, i) => {
      if (i % 2 === 0 && i < this.props.data.value.length / 2) {
        var timeUTC = moment(
          this.getDateFromWeek(time[i / 2].slice(5), time[i / 2].slice(0, 4))
        ).unix();
        var timeMonth = Math.ceil(Date.now() / 1000) - 86400 * 365;
        if (timeUTC < timeMonth) return;
        var object = {
          time: time[i / 2],
          price: this.props.data.value[i + 1],
          volume: this.props.data.value[i] / 1000
        };
        var formattedDate = this.getDateFromWeek(
          object.time.slice(5),
          object.time.slice(0, 4)
        );
        object.time = formattedDate;
        data.push(object);
      }
    });

    return (
      <div className="salmon-graph">
        <ResponsiveContainer>
          <ComposedChart width={600} height={400} data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar
              dataKey="volume"
              barSize={15}
              fill="#413ea0"
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="price"
              strokeWidth={5}
              stroke="#ff7300"
              isAnimationActive={false}
              dot={null}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default SalmonGraph;
