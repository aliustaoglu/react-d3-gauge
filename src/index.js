import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const drawGauge = props => {
  let Needle,
    arc,
    arcEndRad,
    arcStartRad,
    barWidth,
    chart,
    chartInset,
    degToRad,
    el,
    endPadRad,
    height,
    i,
    margin,
    needle,
    numSections,
    padRad,
    percToDeg,
    percToRad,
    percent,
    radius,
    ref,
    sectionIndx,
    sectionPerc,
    startPadRad,
    svg,
    totalPercent,
    width;

  percent = props.percent / 100;
  barWidth = props.barWidth;
  numSections = props.colors.length;
  sectionPerc = 1 / numSections / 2;
  padRad = 0.1 / (numSections - 1);
  chartInset = 10;
  totalPercent = 0.75;
  el = d3.select('.fc822f8a-5edc-41ca-a557-93ec4b5970b7');
  margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  width = el[0][0].offsetWidth - margin.left - margin.right;
  height = width;
  radius = Math.min(width, height) / 2;

  percToDeg = function(perc) {
    return perc * 360;
  };

  percToRad = function(perc) {
    return degToRad(percToDeg(perc));
  };

  degToRad = function(deg) {
    return deg * Math.PI / 180;
  };

  svg = el
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height / 2 + margin.top + margin.bottom);

  chart = svg
    .append('g')
    .attr('transform', 'translate(' + (width + margin.left) / 2 + ', ' + (height + margin.top) / 2 + ')');

  for (sectionIndx = i = 1, ref = numSections; 1 <= ref ? i <= ref : i >= ref; sectionIndx = 1 <= ref ? ++i : --i) {
    arcStartRad = percToRad(totalPercent);
    arcEndRad = arcStartRad + percToRad(sectionPerc);
    totalPercent += sectionPerc;
    startPadRad = sectionIndx === 0 ? 0 : padRad / 2;
    endPadRad = sectionIndx === numSections ? 0 : padRad / 2;
    arc = d3.svg
      .arc()
      .outerRadius(radius - chartInset)
      .innerRadius(radius - chartInset - barWidth)
      .startAngle(arcStartRad + startPadRad)
      .endAngle(arcEndRad - endPadRad);
    chart
      .append('path')
      .style('fill', props.colors[sectionIndx - 1])
      .attr('d', arc);
  }

  Needle = (function() {
    function Needle(len, radius1) {
      this.len = len;
      this.radius = radius1;
    }

    Needle.prototype.drawOn = function(el, perc) {
      el
        .append('circle')
        .style('fill', props.needleColor)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', this.radius);
      return el
        .append('path')
        .style('fill', props.needleColor)
        .attr('class', 'needle')
        .attr('d', this.mkCmd(perc));
    };

    Needle.prototype.animateOn = function(el, perc) {
      let self;
      self = this;
      return el
        .transition()
        .delay(500)
        .ease('elastic')
        .duration(3000)
        .selectAll('.needle')
        .tween('progress', function() {
          return function(percentOfPercent) {
            let progress;
            progress = percentOfPercent * perc;
            return d3.select(this).attr('d', self.mkCmd(progress));
          };
        });
    };

    Needle.prototype.mkCmd = function(perc) {
      let centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
      thetaRad = percToRad(perc / 2);
      centerX = 0;
      centerY = 0;
      topX = centerX - this.len * Math.cos(thetaRad);
      topY = centerY - this.len * Math.sin(thetaRad);
      leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
      leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
      rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
      rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
      return 'M ' + leftX + ' ' + leftY + ' L ' + topX + ' ' + topY + ' L ' + rightX + ' ' + rightY;
    };

    return Needle;
  })();

  needle = new Needle((height * 0.45) - barWidth, 15);

  needle.drawOn(chart, 0);

  needle.animateOn(chart, percent);
};

class Gauge extends Component {
  componentDidMount() {
    drawGauge(this.props);
  }

  render() {
    return (
      <span>
        <div style={{width: this.props.width}} className="fc822f8a-5edc-41ca-a557-93ec4b5970b7" />
      </span>
    );
  }
}

Gauge.defaultProps = {
  width: 400,
  height: 200,
  percent: 50,
  barWidth: 40,
  numSections: 3,
  colors: ['#73de2c', '#e9e61a', '#e92213'],
  needleColor: '#464A4F'
};

Gauge.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  percent: PropTypes.number,
  barWidth: PropTypes.number,
  numSections: PropTypes.number,
  colors: PropTypes.array,
  needleColor: PropTypes.string
};

export default Gauge;
