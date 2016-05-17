import React, { Component } from 'react';
import d3 from 'd3';

class ChargesOverviewPieChart extends Component {
  componentDidMount() {
    const width = 300; // $(this.refs.mountPoint).width();
    const height = this.props.height;
    const radius = Math.min(width / height) / 2;

    const pie = d3.layout.pie()
      .sort(null)
      .value(d => d.total);

    const arc = d3.svg.arc()
      .innerRadius(radius - 100)
      .outerRadius(radius - 50);

    const svg = d3.select(this.refs.mountPoint)
      .attr('width', width)
      .attr('height', height)
      .append('svg')
      .append('g')
      .attr('tranform', `translate(${width / 2}, ${height / 2})`);

    console.log(arc);
    svg.selectAll('path')
      .data(pie([
      	{color: '#1f77b4', total:10},
        {color: '#aec7e8', total:10},
        {color: '#ff7f0e', total:10}
      ]))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => {
        return d.data.color
      })
  }

  render() {
    return <div className="col-xs-12" ref="mountPoint" style={{ height: '300px' }} />;
  }
}
ChargesOverviewPieChart.propTypes = {
  charges: React.PropTypes.array,
  height: React.PropTypes.number,
};

export default ChargesOverviewPieChart;