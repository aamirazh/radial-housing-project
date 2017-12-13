var mymap = L.map('mapid').setView([39.8283, -95.5795],4.4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 5.5,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGFuaXNoMjg3IiwiYSI6ImNqYXp1cjVocDFrZmYyd3FrcjRqM3FraGoifQ.IePtGUZnj3IS6GCdVLLzIg'
}).addTo(mymap);

var popup = new L.Popup();
// control that shows state info on hover
var info = L.control();

function getColor(d) {
return d > 1000 ? '#0a3313' :
       d > 500  ? '#196f2c' :
       d > 200  ? '#22903a' :
       d > 100  ? '#02ce2e' :
       d > 50   ? '#6da97a' :
       d > 20   ? '#85e39a' :
       d > 10   ? '#b4dfbd' :
                  '#ddf9fd';
}

function style(feature) {
    return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'black',
    fillOpacity: .8,
    };
}

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
    weight: 5,
    color: 'white',
    dashArray: '',
    fillColor: 'white',
    fillOpacity: .8,
    });
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    mymap.flyToBounds(e.target.getBounds());
}


var  pt2= {
    radius: 2,
    fillColor: "red",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};

var geojsonMarkerOptions = {
    radius: 6,
    fillColor: "white",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(statesData, {style: style, onEachFeature: onEachFeature}).addTo(mymap);



var n = L.geoJson(cityData, {
    pointToLayer: function (feature, latlng) {
        var name = feature.properties.city;
        var marker = L.circleMarker(latlng, geojsonMarkerOptions);
        marker.bindPopup(name);
        return marker;
    }
}).addTo(mymap);

var n = L.geoJson(cityData, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, pt2);
    }
}).addTo(mymap);
