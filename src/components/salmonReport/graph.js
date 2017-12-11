import React, { Component } from 'react'
import {ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class SalmonGraph extends Component {
  render () {
    var time = Object.keys(this.props.data.dimension.Tid.category.label);
    time.push.apply(
      time,
      Object.keys(this.props.data.dimension.Tid.category.label)
    );
    
    return (
      <div className="salmon-graph">
      <ResponsiveContainer>
        <ComposedChart width={600} height={400} data={data}
              margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <XAxis dataKey="name"/>
            <YAxis />
            <Tooltip/>
            <Legend/>
            <CartesianGrid stroke='#f5f5f5'/>
            <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
            <Bar dataKey='pv' barSize={20} fill='#413ea0'/>
            <Line type='monotone' dataKey='uv' stroke='#ff7300'/>
         </ComposedChart>
       </ResponsiveContainer>
       </div>
    )
  }
}

export default SalmonGraph