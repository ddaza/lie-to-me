'use strict';

var celsius = [];
var light = [];
var socket = window.io();

socket.on('celsius', function (value) {
  celsius.push(value);
  if (celsius.length > n) {
    celsius.shift();
  }
});

socket.on('light', function (value) {
  light.push(value);

  if (light.length > n) {
    light.shift();
  }
})

var n = 40;
  //random = d3.randomNormal(0, .2),
  //data = celsius;

var svg = d3.select('#svg-first'),
  svg1 = d3.select('#svg-second'),
  margin = {top: 20, right: 20, bottom: 20, left: 40},
  width = +svg.attr('width') - margin.left - margin.right,
  height = +svg.attr('height') - margin.top - margin.bottom,
  g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'),
  g1 = svg1.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var x = d3.scaleLinear()
  .domain([0, n - 1])
  .range([0, width]);

var y = d3.scaleLinear()
  .domain([27, 30])
  .range([height, 0]);

var line = d3.line()
  .x(function(d, i) { return x(i); })
  .y(function(d, i) { return y(d); });

//first line
g.append('defs').append('clipPath')
  .attr('id', 'clip')
  .append('rect')
  .attr('width', width)
  .attr('height', height);

g.append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', 'translate(0,' + y(0) + ')')
  .call(d3.axisBottom(x));

g.append('g')
  .attr('class', 'axis axis--y')
  .call(d3.axisLeft(y));

g.append('g')
  .attr('clip-path', 'url(#clip)')
  .append('path')
  .datum(celsius)
  .attr('class', 'line')
  .transition()
  .duration(500)
  .ease(d3.easeLinear)
  .on('start', tick);

// Sencond line

var y1 = d3.scaleLinear()
  .domain([0, 255])
  .range([height, 0]);

var line1 = d3.line()
  .x(function(d, i) { return x(i); })
  .y(function(d, i) { return y1(d); });

g1.append('defs').append('clipPath')
  .attr('id', 'clip')
  .append('rect')
  .attr('width', width)
  .attr('height', height);

g1.append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', 'translate(0,' + y(0) + ')')
  .call(d3.axisBottom(x));

g1.append('g')
  .attr('class', 'axis axis--y')
  .call(d3.axisLeft(y1));

g1.append('g')
  .attr('clip-path', 'url(#clip)')
  .append('path')
  .datum(light)
  .attr('class', 'line')
  .transition()
  .duration(500)
  .ease(d3.easeLinear)
  .on('start', tick1);

function tick() {
  // Push a new data point onto the back.
  //data.push(celsius);

  // Redraw the line.
  d3.select(this)
    .attr('d', line)
    .attr('transform', null);

  // Slide it to the left.
  d3.active(this)
    .attr('transform', 'translate(' + x(-1) + ',0)')
    .transition()
    .on('start', tick);

  // Pop the old data point off the front.
}


function tick1() {
  // Push a new data point onto the back.
  //data.push(celsius);

  // Redraw the line.
  d3.select(this)
    .attr('d', line1)
    .attr('transform', null);

  // Slide it to the left.
  d3.active(this)
    .attr('transform', 'translate(' + x(-1) + ',0)')
    .transition()
    .on('start', tick1);

  // Pop the old data point off the front.

}
