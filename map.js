const center = [-25.908400, 32.440200];
var map = L.map('map').setView([-25.906681, 32.440996], 14);
map.keyboard.disable();
map.dragging.disable();
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const marker = L.marker(center).addTo(map);

marker.bindPopup("<b>Matola - Bairro Mozal</b><br>djuba R/C, loja n° 047.").openPopup();

L.circle(center, {
    color: '#fc36a9',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 50
}).addTo(map);