import './style.css';
import {Feature, Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import {fromLonLat} from 'ol/proj';
import { Point } from 'ol/geom';  
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
} from 'ol/style';


//Ricky: Vegas, NV
//Annie: Vegas, NV


//
//declare SLO coordinates
const sloCoords = fromLonLat([-120.660011, 35.282619]);


// create the source and layer for random features
var point1 = new Point(sloCoords);
var slofeature = new Feature(point1);
var lvfeature = new Feature(new Point(fromLonLat([-115.13983, 36.169941]))); 
var ccfeature = new Feature(new Point(fromLonLat([-80.607713, 28.392218])));
var sffeature = new Feature(new Point(fromLonLat([-122.419418, 37.774929])));

var locationDict = [
  { cityFeature: lvfeature, density: 3}, //Las Vegas
  { cityFeature: slofeature, density: 2}, //San Luis Obispo
  { cityFeature: ccfeature, density: 1}, //Cape Cananveral, FL
  { cityFeature: sffeature, density: 8} //San Francisco
];  

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: sloCoords,
    zoom: 5
  })
});


function getSizeForFrequency(frequency) {
  // This is a simple calculation; you might want to use a more
  // sophisticated function depending on your data's range and distribution.
  return Math.min(40, 5 + frequency);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

locationDict.forEach(location => {
  //extract data
  var pointFeature = location.cityFeature;
  var pointSize = getSizeForFrequency(location.density);
  
  var style = new Style({
    image: new CircleStyle({
      radius: pointSize, // Use the dynamic size
      fill: new Fill({color: getRandomColor()}),
      stroke: new Stroke({
        color: 'white',
        width: 1.5
      }),
    }),
  });

  pointFeature.setStyle(style);

  // Create a vector source and add the feature
  var vectorSource = new VectorSource({
    features: [pointFeature]
  });

  // Create a vector layer with the source
  var vectorLayer = new VectorLayer({
    source: vectorSource
  });


  // Add the vector layer to the map
  map.addLayer(vectorLayer);
  
});

var style = new Style({
  image: new CircleStyle({
    radius: 10, // Use the dynamic size
    fill: new Fill({color: 'red'}),
    stroke: new Stroke({
      color: 'white',
      width: 1.5
    }),
  }),
});


// var vectorSource = new VectorSource({
//   features: locations
// });


// var vectorLayer = new VectorLayer({
//   source: vectorSource
// });




map.addLayer(vectorLayer);
