document.addEventListener("DOMContentLoaded", () => {
    function initMap() {
        const map = new google.maps.Map(document.getElementById("map-container"), {
            center: { lat: -30.05, lng: 30.80 },
            zoom: 12,
            mapTypeControl: true
        });

        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon']
            },
            polygonOptions: {
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                editable: true,
                draggable: true
            }
        });
        drawingManager.setMap(map);

        const trafficLayer = new google.maps.TrafficLayer();
        document.getElementById("toggle-traffic").addEventListener("click", () => {
            trafficLayer.setMap(trafficLayer.getMap() ? null : map);
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
            document.getElementById("loading-indicator").style.display = "none";
        });
    }

    // Ensure initMap is globally accessible
    window.initMap = initMap;

    // Wait for Google Maps to load before initializing the map
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAAJBKHAL3zul4P5L-_CZo8GCpYYGN9y48&libraries=drawing&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
});
