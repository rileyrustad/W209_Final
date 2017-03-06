
var w = 650;
var h = 500;

var projection = d3.geoMercator()
    .center([-122.67,45.54])
    .scale(80000)
    .translate([w / 2, h / 2]);

var path = d3.geoPath()
    .projection(projection);

var svg = d3.select("#pdx-map")
    .append("svg")
    .attr("class","map")
    .attr("width", w)
    .attr("height", h);

d3.json("data/shapes.geojson", function(json) {
    console.log(json);
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
                .attr("stroke-width", '3');
        })
        .on("mouseout", function() {
            d3.select(this)
                .attr("fill", "black")
                .attr("stroke-width", '1');
        })
        .on("click", function(d) {
            console.log(d.properties.Analysis_A)
            d3.select(".pdx-map")
                .selectAll(".neighborhood")
                .data(d)
                .enter()
                .append("p")
                .text(d.properties.Analysis_A);

        })

});

function updateMap (...args){
console.log(args);
};