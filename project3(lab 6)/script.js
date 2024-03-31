// Initialize Leaflet map
var map = L.map('map').setView([51.0447, -114.0719], 12);

// Initialize feature group to store drawn items
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Add base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Initialize Leaflet draw control
var drawControl = new L.Control.Draw({
    draw: {
        polyline: true,
        polygon: false,
        circle: false,
        rectangle: false,
        marker: false
    },
    edit: {
        featureGroup: drawnItems,
        remove: false
    }
});

// Add draw control to the map
map.addControl(drawControl);

// Event listener for draw created
map.on('draw:created', function (e) {
    var layer = e.layer;
    drawnItems.addLayer(layer);
});

// Function to simplify polyline
function simplifyPolyline() {
    // Get the drawn polyline
    var drawnPolyline = drawnItems.toGeoJSON();

    // Simplify the polyline
    var simplifiedPolyline = turf.simplify(drawnPolyline);

    // Remove existing drawn polyline
    drawnItems.clearLayers();

    // Add simplified polyline to map with a different color
    L.geoJSON(simplifiedPolyline, {
        style: {
            color: 'green' // Specify the color you want for the simplified polyline
        }
    }).addTo(map);
}

// Function to remove polyline
function removePolyline() {
    // Clear the drawn polyline from the map
    drawnItems.clearLayers();
}
