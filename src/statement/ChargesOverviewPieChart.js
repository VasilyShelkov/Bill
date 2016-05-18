import React, { Component } from 'react';
import d3 from 'd3';

class ChargesOverviewPieChart extends Component {
  componentDidMount() {
    const width = $(this.refs.mountPoint).width();
    const height = this.props.height;
    const radius = Math.min(width, height) / 2;

    const pie = d3.layout.pie()
      .sort(null)
      .value(d => d.breakdown.total);

    const arc = d3.svg.arc()
      .innerRadius(radius - 100)
      .outerRadius(radius - 50);

    const svg = d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);


    const path = svg.selectAll('path')
      .data(pie(this.props.charges))
      .enter()
      .append('path');

    path
      .attr('d', arc)
      .attr('fill', d => d.data.color);
  }

  render() {
    return <div className="col-xs-12" ref="mountPoint" />;
  }
}
ChargesOverviewPieChart.propTypes = {
  charges: React.PropTypes.array,
  height: React.PropTypes.number,
};

export default ChargesOverviewPieChart;
