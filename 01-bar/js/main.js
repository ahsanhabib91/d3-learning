const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 600;
const margin = { left: 100, right: 10, top: 10, bottom: 100 };
const height = CANVAS_HEIGHT - margin.top - margin.bottom;
const width = CANVAS_WIDTH - margin.left - margin.right;
console.log(width, height);
// Drawing the SVG canvas
var svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", CANVAS_WIDTH)
  .attr("height", CANVAS_HEIGHT);
// .style("border", "1px solid");

// Translating the Figure to appropriate postion inside of SVG canvas
var g = svg
  .append("g")
  .attr("transform", `translate( ${margin.left}, ${margin.top} )`);

// Loading Data and Plotting the Graph
d3.json("data/buildings.json").then(function(data) {
  console.log(data);

  // Converting the height value type from string to number
  data.forEach(d => {
    d.height = +d.height;
  });

  // Setup X-Axis equation
  var x = d3
    .scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  // Setup Y-Axis equation
  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.height)])
    .range([0, height]);

  // Labels: X-Axis generator
  var xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxisCall)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)");

  // Labels: Y-Axis generator
  var yAxisCall = d3.axisLeft(y);
  g.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);

  // Plotting the main BAR graph
  var rects = g
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", 0)
    .attr("x", d => x(d.name))
    .attr("width", x.bandwidth)
    .attr("height", d => y(d.height))
    .attr("fill", "grey");
});
