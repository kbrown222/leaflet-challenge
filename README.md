# Unit 15 Homework: Visualizing Data with Leaflet

## Background

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 

The USGS was interested in building a new set of tools that would allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

# Navigating the Repository

The static folder contains the css and js files that pertain to styling and the Java Script code, respectively, to generate the visualization of earthquake data.

The Images folder contains some example visualizations to refer to.

Finally, the index.html is also included.

### Part 1: Create the Earthquake Visualization

![2-BasicMap](Images/2-BasicMap.png)

The earthquake dataset was visualized for earthquake data in the past 7 days by completing the following steps:

1. The dataset was obtained from the following link:

   * The USGS provides earthquake data in a number of different formats, updated every five minutes. The following page was visited: [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and a dataset was chosen to visualize. The following image is an example screenshot of what appears when visiting this link:

   ![3-Data](Images/3-Data.png)

    *By clicking a dataset (such as "All Earthquakes from the Past 7 Days"), a JSON representation of that data is provided. This URL of this JSON is used to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:

   ![4-JSON](Images/4-JSON.png)

2. Imported and visualized the data by doing the following: 

   * Using Leaflet, a map was created that plotted all the earthquakes from the chosen dataset based on their longitude and latitude.

       *  The data markers refelect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.

   * Popups that provide additional information about the earthquake when its associated marker is clicked, is also provided.

   * A corresponding legend is also generated that provides context for the map data.

- - -

### Part 2: Gather and Plot More Data (Optional)

The USGS wanted a second dataset on the map to illustrate the relationship between tectonic plates and seismic activity. This dataset is pulled and visualizeed alongside the original data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

The following image is an example screenshot of what the USGS would like as the end product:

![5-Advanced](Images/5-Advanced.png)

The following tasks were performed:

* The tectonic plates dataset on the map in addition to the earthquakes was plotted.

* Other base maps were added.

* Each dataset was placed into separate overlays that have the ability to be turned on and off independently.

* Layer controls were added to the map.

___
© 2022 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
