// --------------------------------------------------------
// 1. Initialize map
mapboxgl.accessToken = 'pk.eyJ1Ijoic295aSIsImEiOiJjazF1eW45dG8wYmtrM2JwNWJ2NGczeGM0In0.u5zL-HKFNlawjUQCAGs6kQ';
 
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/soyi/ck3qsb2n805pd1cmntqbh66th'
});

var size = 100;
 
// implementation of CustomLayerInterface to draw a pulsing dot icon on the map
// see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
var pulsingDot = {
width: size,
height: size,
data: new Uint8Array(size * size * 4),
 
// get rendering context for the map canvas when layer is added to the map
onAdd: function() {
var canvas = document.createElement('canvas');
canvas.width = this.width;
canvas.height = this.height;
this.context = canvas.getContext('2d');
},
 
// called once before every frame where the icon will be used
render: function() {
var duration = 1000;
var t = (performance.now() % duration) / duration;
 
var radius = size / 2 * 0.3;
var outerRadius = size / 2 * 0.7 * t + radius;
var context = this.context;
 
// draw outer circle
context.clearRect(0, 0, this.width, this.height);
context.beginPath();
context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
context.fill();
 
// draw inner circle
context.beginPath();
context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
context.fillStyle = 'rgba(255, 100, 100, 1)';
context.strokeStyle = 'white';
context.lineWidth = 2 + 4 * (1 - t);
context.fill();
context.stroke();
 
// update this image's data with data from the canvas
this.data = context.getImageData(0, 0, this.width, this.height).data;
// console.log(this.data);
 
// continuously repaint the map, resulting in the smooth animation of the dot
map.triggerRepaint();
 
// return `true` to let the map know that the image was updated
return true;
}
};
 
map.on('load', function () {
 
map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
 
map.addLayer({
"id": "points",
"type": "symbol",
"source": {
"type": "geojson",
"data": {
"type": "FeatureCollection",
"features": [{
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [119.03, 28.08]
}
},
{
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [119.00, 28.00]
}
},
{
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [118.95, 27.98]
}
},
{
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [119.06, 28.13]
}
},
{
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [119.16, 27.93]
}
},
{
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [119.20, 28.04]
}
},
{
"type": "Feature",
"geometry": {
"type": "Point",
"coordinates": [119.204, 28.14]
}
}]
}
},
"layout": {
"icon-image": "pulsing-dot"
}
});

});
 
map.on('load', function() {
 
// Add a layer showing the places.
map.addLayer({
"id": "places",
"type": "symbol",
"source": {
"type": "geojson",
"data": {
"type": "FeatureCollection",
"features": [{
"type": "Feature",
"properties": {
"description": "<strong>Make it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
"icon": "theatre"
},
"geometry": {
"type": "Point",
"coordinates": [119.13, 28.18]
}
}, {
"type": "Feature",
"properties": {
"description": "<strong>The Kiln Fire Will Never Extinguish</strong><p>In the long years of firing Longquan celadon, the porcelain craftsmen had to ask for the blessing of the gods in order to burn the best porcelain, thus forming a set of customs of firing celadon. Today, we can still take a look and participate as well as experience some of them in the theatre.</p>",
"icon": "theatre"
},
"geometry": {
"type": "Point",
"coordinates": [119.10, 28.00]
}
}, {
"type": "Feature",
"properties": {
"description": "<strong>Alley Memory</strong><p>Several simple old houses, located in a village with rich celadon making history but no longer conduct the industry. The mottled exterior wall is full of the imprint of the years, the green tile powder wall, the wooden door copper lock memory of the Chinese courtyard, it provides the stability, the tranquility, the harmony, the stretch living environment and the historical memory.</p>",
"icon": "bar"
},
"geometry": {
"type": "Point",
"coordinates": [119.05, 27.98]
}
}, {
"type": "Feature", 
"properties": {
"description": "<strong>Longquan Celadon & Sword  Market</strong><p>It is a national 3A scenic spot, and also combines production, sales, cultural display, participation and experience, tourism shopping together. It is a window of local traditional celadon making industry as well as the celadon making culture.</p>",
"icon": "art-gallery"
},
"geometry": {
"type": "Point",
"coordinates": [119.16, 28.08]
}
}, {
"type": "Feature",
"properties": {
"description": "<strong>Green Bicycle Lance</strong><p>To the citizens, the green lane is a happy journey to the quality of life, to the countryside is a road to prosperity. To the countryside, and to Longquan is a Hess road to carry forward celadon culture.</p>",
"icon": "bicycle"
},
"geometry": {
"type": "Point",
"coordinates": [119.26, 28.03]
}
// }, {
// "type": "Feature",
// "properties": {
// "description": "<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>",
// "icon": "star"
// },
// "geometry": {
// "type": "Point",
// "coordinates": [-77.043444, 38.909664]
// }
// }, {
// "type": "Feature",
// "properties": {
// "description": "<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>",
// "icon": "music"
// },
// "geometry": {
// "type": "Point",
// "coordinates": [-77.031706, 38.914581]
// }
// }, {
// "type": "Feature",
// "properties": {
// "description": "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>",
// "icon": "music"
// },
// "geometry": {
// "type": "Point",
// "coordinates": [-77.020945, 38.878241]
// }
// }, {
// "type": "Feature",
// "properties": {
// "description": "<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>",
// "icon": "music"
// },
// "geometry": {
// "type": "Point",
// "coordinates": [-77.007481, 38.876516]
// }
}]
}
},
"layout": {
"icon-image": "{icon}-15",
"icon-allow-overlap": true
}
});


 
// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false
});
 
map.on('mouseenter', 'places', function(e) {
// Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = 'pointer';
 
var coordinates = e.features[0].geometry.coordinates.slice();
var description = e.features[0].properties.description;
 
// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}
 
// Populate the popup and set its coordinates
// based on the feature found.
popup.setLngLat(coordinates)
.setHTML(description)
.addTo(map);
});
 
map.on('mouseleave', 'places', function() {
map.getCanvas().style.cursor = '';
popup.remove();
});
});

 
// --------------------------------------------------------
// 2. Show a modal window when About button is clicked
// A modal window is an element that sits on top of an application's main window. It can be opened and closed without reloading the page

    $("#about").on('click', function() { // Click event handler for the About button in jQuery, see https://api.jquery.com/click/
        $("#screen").fadeToggle(); // shows/hides the black screen behind modal, see https://api.jquery.com/fadeToggle/
        $(".modal").fadeToggle(); // shows/hides the modal itself, see https://api.jquery.com/fadeToggle/
        console.log('xxx');
    });

    $(".modal>.close-button").on('click', function() { // Click event handler for the modal's close button
        $("#screen").fadeToggle();
        $(".modal").fadeToggle();
    });

// --------------------------------------------------------
// 3. Creating a legend
// See example tutorial at https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-2/#create-arrays-of-intervals-and-colors

    var layers = [ 
    ];

    var colors = [ // an array of the color values for each legend item
        '#800000',
        '#800030',
        '#800060',
        '#80006c',
        '#800090',
        '#80009c'
    ];

    // for loop to create individual legend items
    for (i=0; i<layers.length; i++) {
        var layer =layers[i]; // name of the current legend item, from the layers array
        var color =colors[i]; // color value of the current legend item, from the colors array 
        
        var itemHTML = "<div><span class='legend-key'></span><span>" + layer + "</span></div>"; // create the HTML for the legend element to be added

        var item = $(itemHTML).appendTo("#legend"); // add the legend item to the legend
        var legendKey = $(item).find(".legend-key"); // find the legend key (colored circle) for the current item
        legendKey.css("background", color); // change the background color of the legend key
    }


// --------------------------------------------------------



// -------------------------------------------------------- 
// 5. Popups
// See tutorial at https://docs.mapbox.com/help/tutorials/add-points-pt-3/
// See example of popups on click at https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/ 
// See example of popups on hover at https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/

    // Create a popup on click 
    map.on('click', function(e) {   // Event listener to do some code when user clicks on the map

      var stops = map.queryRenderedFeatures(e.point, {  // Query the map at the clicked point. See https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/ for an example on how queryRenderedFeatures works and https://www.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures for documentation
        layers: ['cville-bus-stops']    // replace this with the name of the layer from the Mapbox Studio layers panel
    });

      // if the layer is empty, this if statement will exit the function (no popups created) -- this is a failsafe to avoid non-functioning popups
      if (stops.length == 0) {
        return;
    }

    // Initiate the popup
    var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
    });

      // Set the popup location based on each feature
      popup.setLngLat(stops[0].geometry.coordinates);

      // Set the contents of the popup window
      popup.setHTML('<h3>Stop ID: ' + stops[0].properties.stop_id + '</h3><p>' + stops[0].properties.stop_name + '</p>');
            // stops[0].properties.stop_id will become the title of the popup (<h3> element)
            // stops[0].properties.stop_name will become the body of the popup


        popup.setHTML('<p>' + stops[0].properties.stop_name + '</p>')
        

      // Add the popup to the map 
      popup.addTo(map);  // replace "map" with the name of the variable in line 4, if different
  });


// -------------------------------------------------------- 
// 6. Show/hide layers
// See example at https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/
    
    var layers = [  // an array of the layers you want to include in the layers control (layers to turn off and on)

        // [layerMachineName, layerDisplayName]
        // layerMachineName is the layer name as written in your Mapbox Studio map layers panel
        // layerDisplayName is the way you want the layer's name to appear in the layers control on the website
        ['longquan-soil', 'Soil'],                      // layers[0]
        ['waterway', 'Waterway'],                              // layers[1][1] = 'Parks'
        ['road', 'Road'], 
        ['mapbox-satellite', 'Satellite Map'], 
        ['traffic', 'Expressway'],     
        // ['cville-bus-stops-heatmap', 'Bus Stop Heatmap'],
        // ['background', 'Map background']
        // add additional live data layers here as needed
    ]; 

    // functions to perform when map loads
    map.on('load', function () {
        
        
        for (i=0; i<layers.length; i++) {

            // add a button for each layer
            $("#layers-control").append("<a href='#' class='active button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>"); // see http://api.jquery.com/append/
        }

        // show/hide layers when button is clicked
        $("#layers-control>a").on('click', function(e) {

                var clickedLayer = e.target.id;

                e.preventDefault();
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#getlayoutproperty
                console.log(visibility);

                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                    $(e.target).removeClass('active');
                } else {
                    $(e.target).addClass('active');
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible'); // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                }
        });
    });



