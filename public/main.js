function createMap() {
    return new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 41.881832, lng: -87.623177 },
    });
}


function getTrainLocation(apiURL) {
    console.log(apiURL);
    fetch(apiURL, { mode: 'cors' }).then((data) => console.log(data));

}


async function main() {
    let markers = [];
    const map = createMap();


    // Create the lines
    new google.maps.KmlLayer({
        url: "https://googlearchive.github.io/js-v2-samples/ggeoxml/cta.kml",
        map: map,
      });

    const trains = await (await fetch('/api/')).json();

    


    // Takes JSON train data (lat and long) and pushes it into an array.
    trains.forEach(({ lat, lon, color }) => {
        markers.push(new google.maps.Marker({
            position: { lat: +lat, lng: +lon },
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8.5,
                fillColor: color,
                fillOpacity: 1.0,
                strokeWeight: 1.0
            },
        }))
    });

    setInterval(async () => {
        // Clears all the markers off of the map
        markers.forEach((marker) => {
            marker.setMap(null);
        });



        markers = [];

        const trains = await (await fetch('/api/')).json();

        trains.forEach(({ lat, lon, color }) => {
            markers.push(new google.maps.Marker({
                position: { lat: +lat, lng: +lon },
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8.5,
                    fillColor: color,
                    fillOpacity: 1.0,
                    strokeWeight: 1.0
                },
            }))
        });

    }, 1000 * 10);



    return 0;
}