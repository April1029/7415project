

mapboxgl.accessToken = 'pk.eyJ1Ijoic295aSIsImEiOiJjazF1eW45dG8wYmtrM2JwNWJ2NGczeGM0In0.u5zL-HKFNlawjUQCAGs6kQ';
 
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/soyi/ck23gjp3rfps61dpem51sitxb'
});
 
var size = 200;
 
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
//  mapboxgl.accessToken = 'pk.eyJ1Ijoic295aSIsImEiOiJjazF1eW45dG8wYmtrM2JwNWJ2NGczeGM0In0.u5zL-HKFNlawjUQCAGs6kQ';
 
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/streets-v11',
// center: [-77.04, 38.907],
// zoom: 11.15
// });
 
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
"description": "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>",
"icon": "theatre"
},
"geometry": {
"type": "Point",
"coordinates": [119.10, 28.00]
}
}, {
"type": "Feature",
"properties": {
"description": "<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>",
"icon": "bar"
},
"geometry": {
"type": "Point",
"coordinates": [119.05, 27.98]
}
}, {
"type": "Feature",
"properties": {
"description": "<strong>Ballston Arts & Crafts Market</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>",
"icon": "art-gallery"
},
"geometry": {
"type": "Point",
"coordinates": [119.16, 28.08]
}
}, {
"type": "Feature",
"properties": {
"description": "<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>",
"icon": "bicycle"
},
"geometry": {
"type": "Point",
"coordinates": [119.26, 28.03]
}
}, {
"type": "Feature",
"properties": {
"description": "<strong>Capital Pride Parade</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>",
"icon": "star"
},
"geometry": {
"type": "Point",
"coordinates": [-77.043444, 38.909664]
}
}, {
"type": "Feature",
"properties": {
"description": "<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>",
"icon": "music"
},
"geometry": {
"type": "Point",
"coordinates": [-77.031706, 38.914581]
}
}, {
"type": "Feature",
"properties": {
"description": "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>",
"icon": "music"
},
"geometry": {
"type": "Point",
"coordinates": [-77.020945, 38.878241]
}
}, {
"type": "Feature",
"properties": {
"description": "<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>",
"icon": "music"
},
"geometry": {
"type": "Point",
"coordinates": [-77.007481, 38.876516]
}
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
