//
//
//
// var w = 650;
// var h = 500;
//
// var projection = d3.geoMercator()
//     .center([-122.67,45.54])
//     .scale(80000)
//     .translate([w / 2, h / 2]);
//
// var path = d3.geoPath()
//     .projection(projection);
//
// var svg = d3.select("#pdx-map")
//     .append("svg")
//     .attr("class","map")
//     .attr("width", w)
//     .attr("height", h);
//
// d3.json("data/shapes.geojson", function(json) {
//     console.log(json);
//     //Bind data and create one path per GeoJSON feature
//     svg.selectAll("path")
//         .data(json.features)
//         .enter()
//         .append("path")
//         .attr("d", path)
//         .attr("stroke", "white")
//
//         .on("mouseover", function() {
//             d3.select(this)
//                 .attr("fill", "steelblue")
//                 .attr("stroke-width", '3');
//         })
//         .on("mouseout", function() {
//             d3.select(this)
//                 .attr("fill", "black")
//                 .attr("stroke-width", '1');
//         })
//         .on("click", function(d) {
//             console.log(d.properties.Analysis_A)
//             d3.select(".pdx-map")
//                 .selectAll(".neighborhood")
//                 .data(d)
//                 .enter()
//                 .append("p")
//                 .text(d.properties.Analysis_A);
//
//         })
//
// });
//
// function updateMap (...args){
// console.log(args);
// };

var map = L.map('mapid').setView([45.545, -122.67], 11);
var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

d3.json("data/shapes.geojson", function(error, collection) {
    if (error) throw error;
//        console.log(path.bounds(collection));

    var transform = d3.geoTransform({point: projectPoint}),
        path = d3.geoPath().projection(transform);

    var feature = g.selectAll("path")
        .data(collection.features)
        .enter().append("path")
        .style("opacity", 0.3)
        .attr("fill", "lightblue")
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
        .on("click", function() {
            console.log("blah")
        });

    map.on("zoomend", reset);
    reset();

    // Reposition the SVG to cover the features.
    function reset() {
        var bounds = path.bounds(collection),
            topLeft = bounds[0],
            bottomRight = bounds[1];

        svg .attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px");

        g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

        feature.attr("d", path)
            .attr("stroke","white");
    }

    // Use Leaflet to implement a D3 geometric transformation.
    function projectPoint(x, y) {
        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
    }
});