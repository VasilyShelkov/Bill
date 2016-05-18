import React, { Component } from 'react';
import d3 from 'd3';
import { capitalizeAndSpaceString } from '../utilities';

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

    svg.selectAll('text').data(pie(this.props.charges))
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('x', (d) => {
        const a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
        d.cx = Math.cos(a) * (radius - 75);
        return d.x = Math.cos(a) * (radius - 20);
      })
      .attr('y', (d) => {
        const a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
        d.cy = Math.sin(a) * (radius - 75);
        return d.y = Math.sin(a) * (radius - 20);
      })
      .text((d) => capitalizeAndSpaceString(d.data.category))
      .style('fill', (d) => d.data.color)
      .each(function (d) {
        const bbox = this.getBBox();
        d.sx = d.x - bbox.width / 2 - 2;
        d.ox = d.x + bbox.width / 2 + 2;
        d.sy = d.oy = d.y + 5;
      });

    const polyline = svg.select('.lines').selectAll('polyline')
      .data(pie(this.props.charges));

    polyline.enter()
      .append('polyline');
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
