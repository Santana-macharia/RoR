function myMap(mapId, mapOptions) {
    var mapCanvas = document.getElementById(mapId);
    if (mapOptions == null) {
        mapOptions = {
            center: new google.maps.LatLng(40.691, -75.214),
            zoom: 13
        };
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    // Load all MapPoints from database and place them
    getMarkersFromDB(placeMarkers, map)

    // Map click event listener for placing MapPoints
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(map, event.latLng);
        insertMarkerToDB(event.latLng, 'test');
    });

    // Place multiple MapPoints on the map
    function placeMarkers(map, points) {
        points.forEach(function(point) {
            placeMarker(map, {
                lat: Number(point.latitude),
                lng: Number(point.longitude)
            });
        });
    }

    // Place a MapPoint on the map
    function placeMarker(map, location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }

    // Insert a MapPoint record to the database
    function insertMarkerToDB(location, name) {
        $.ajax({
            type: 'GET',
            url: '/MapPoint/create.json',
            data: {
                latitude: location.lat,
                longitude: location.lng,
                name: name
            },
            success: function(data) {
                //console.log('RESULT: ' + JSON.stringify(data));
            }
        });
    }

    // Get all MapPoints from the database
    function getMarkersFromDB(callback, map) {
        $.ajax({
            type: 'GET',
            url: '/MapPoint/all.json',
            success: function(data) {
                callback(map, data.points);
            }
        })
    }
}
