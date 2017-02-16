
var w = 500;
var h = 400;

var projection = d3.geoMercator()
    .center([-122.67,45.54])
    .scale(60000)
    .translate([w / 2, h / 2]);



var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("body")
    .append("svg")
    .attr("class","map")
    .attr("width", w)
    .attr("height", h);

d3.json("data/shapes.geojson", function(json) {
    console.log(json)
    //Bind data and create one path per GeoJSON feature
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "white")

        .on("mouseover", function() {
            d3.select(this)
                .attr("fill", "steelblue")
                .attr("stroke-width", '5');
        })
        .on("mouseout", function() {
            d3.select(this)
                .attr("fill", "black")
                .attr("stroke-width", '1');;
        })
        .on("click", function(d) {
            console.log(d.properties.Analysis_A)
            d3.select("body")
                .selectAll(".neighborhood")
                .data(d)
                .enter()
                .append("p")
                .text(d.properties.Analysis_A);

        })

});