// Create the tile layers 
var defaultMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create grayscale layer
var grayscale = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

// Create watercolor layer
var waterColor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});

// Create topographic map
var topographic = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create basemap object
let basemaps = {
    GrayScake: grayscale,
    WaterColor: waterColor,
    TopoGraphic: topographic,
    Default: defaultMap
};

// make a map object
var myMap = L.map("map", {
    center: [36.7783, -119.4179],
    zoom: 5,
    layers: [grayscale, waterColor, topographic, defaultMap]
});

// add the default map to the map object
defaultMap.addTo(myMap);


// call the API to get the information for the tectonic plates
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(
    function(plateData){
        // do console log to make sure the data loads
        //console.log(plateData)

        // load the data using geoJson and add to the tectonic plates layer group
        L.geoJson(plateData,{
            // add styling to make sure the lines are visible
            color: "yellow",
            weight: 2
        }).addTo(tectonicPlates)
    });

// Get data related to the tectonic plates and draw on the map
// variable to hold the tectonic plates layer
let tectonicPlates = new L.layerGroup();

// add the tectonic plates to the map
tectonicPlates.addTo(myMap);

// variable to hold the earthquakes data layer
let earthquakes = new L.layerGroup();

// get the data for the earthquakes and populate the layer group
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(
    function(earthquakeData){
        // check to make sure data gets loaded
        console.log(earthquakeData)
        // plot circles where the radius is dependent on the magnitude of the earthquake
        // color is dependent on the depth of the earthquake

        // make a function that chooses the color of the data point
        function dataColor(depth){
            if (depth > 90)
                return "red";
            else if (depth > 70)
                return "#fc4903";
            else if (depth > 50)
                return "#fc8403";
            else if (depth > 30)
                return "#fcad03";
            else if (depth > 10)
                return "#cafc03";
            else   
                return "green"
        };

        // make a function that determines the size of the radius based on the magnitude of the earthquake
        function radiusSize(mag){
            if (mag == 0)
                return 1; // makes sure that a 0 magnitude earthquake shows up
            else
                return mag * 5; // makes sure that the circle is pronounced on the map
        }

        // add on to the style for each data point
        function dataStyle(feature){
            return {
                opacity: 0.5,
                fillOpacity: 0.5,
                fillColor: dataColor(feature.geometry.coordinates[2]), // ues index 2 for the depth
                color: "000000", //outline colors is black
                radius: radiusSize(feature.properties.mag),
                weight: 0.5
            }
        }

        // Add the GeoJson data to the earthquake layer group
        L.geoJson(earthquakeData, {
            // make each feature marker that is on the map, where each marker is a circle
            pointToLayer: function(feature, latLng){
                return L.circleMarker(latLng);
            },
            // set the style for each marker
            style: dataStyle, // calls the data style function and passes in the earthquake data
            // add pop ups 
            onEachFeature: function(feature, layer){
                layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                                Depth: <b>${feature.geometry.coordinates[2]}</b><br>
                                Location: <b>${feature.properties.place}</b>`);
            }
        }).addTo(earthquakes);
    }
);

// add the earthquake layer 
earthquakes.addTo(myMap);


// add the overlay for the tectonic plates and for the earthquakes
let overlays = {
    "Tectonic Plates": tectonicPlates,
    "Earthquake Data": earthquakes
};

// add the layer control
L.control
.layers(basemaps, overlays)
.addTo(myMap);

// add a legend to the map
let legend = L.control({
    position: "bottomright"
});

// add the properties for the legend
legend.onAdd = function(){
    // make a div for the legend to appear on the page
    let div = L.DomUtil.create("div", "info legend");
    console.log(div);

    // set the intervals
    let intervals = [-10, 10, 30, 50, 70, 90];
    
    // set colors for the intervals
    let colors = [
        "green",
        "#cafc03",
        "#fcad03",
        "#fc8403",
        "#fc4903",
        "red"
    ];

    // loop through the intervals and the colors and generate a label
    // with a colored square for each interval
    for (var i = 0; i <intervals.length; i++)
    {
      // inner html that sets the square for each interval and label\
      div.innerHTML += "<i style='background: " + colors[i] + "'></i>"
      + intervals[i]  
      + (intervals[i + 1] ? " km &ndash; " + intervals[i + 1] + " km<br>" : "+");
    }

    return div;
};

// add the legend to the map
legend.addTo(myMap);