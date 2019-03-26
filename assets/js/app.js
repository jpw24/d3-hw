// @TODO: YOUR CODE HERE!
// svg container
var height = 400;
var width = 400;

// margins
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// chart area minus margins
var chartHeight = height - margin.top - margin.bottom;
var chartWidth = width - margin.left - margin.right;

// create svg container
var svg = d3.selectAll("scatter").append("svg")
    .attr("height", height)
    .attr("width", width);

// shift everything over by the margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv", function(error, state_data) {
    if (error) throw error;

    console.log(state_data);
    state_data.forEach(function(data) {
        data.state = data.state;
        data.abbrev=data.abbrev;
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income=+data.income;
        data.obesity=+data.obesity;
    });
    
    // Create scaling functions
    var xLinearScale1 = d3.scaleLinear()
        .domain(d3.extent(state_data, d => d.obesity))
        .range([0, width]);

    var yLinearScale1 = d3.scaleLinear()
        .domain([0, d3.max(state_data, d => d.poverty)])
        .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale1)
    var leftAxis = d3.axisLeft(yLinearScale1);


    // Add x-axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // Add y1-axis to the left side of the display
    chartGroup.append("g")
    // Define the color of the axis text
        .classed("green", true)
        .call(leftAxis);
    
    
    svg.selectAll("text")
        .data(state_data)
        .enter()
        .append("text")
        .text(function(d) {
            return d.abbrev;
        })
        .attr("x", function(d) {
            return xLinearScale1(d.obesity);  // Returns scaled location of x
        })
        .attr("y", function(d) {
            return yLinearScale1(d.poverty);  // Returns scaled circle y
        })
        .attr("font_family", "sans-serif")  // Font type
        .attr("font-size", "11px")  // Font size
        .attr("fill", "darkgreen");   // Font color


        
    chartGroup.selectAll("circle")
        .data(state_data)
        .enter()
        .append("circle")
        //.attr("cx", (d, i) => xScale(i))
        //.attr("cy", d => yScale(d))
        .attr("r", "10")
        .attr("fill", "red");
    
    chartGroup.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("cx", (d, i) => xLinearScale1(i))
        .attr("cy", d => yLinearScale1(d));

    });