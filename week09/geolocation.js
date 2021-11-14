navigator.geolocation.getCurrentPosition(youAreHere);


function youAreHere(position) {
    console.log(`Latitude: ${position.coords.latitude},
    Longitude: ${position.coords.longitude}`);
    document.getElementById('geo').innerHTML = `Latitude: ${position.coords.latitude},
    Longitude: ${position.coords.longitude}`;
    }
    