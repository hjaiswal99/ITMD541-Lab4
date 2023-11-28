function getSunriseSunsetByLocation() {
  const useCurrentLocation = document.getElementById('currentLocation').checked;

  if (useCurrentLocation) {
    // Use Geolocation API to get current coordinates
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getSunriseSunsetByCoordinates(latitude, longitude);
      },
      error => {
        console.error('Error getting current location:', error);
        alert('Unable to retrieve current location. Please enter coordinates manually.');
      }
    );
  } else {
    // Use entered coordinates for named location
    const searchLocation = document.getElementById('searchLocation').value;
    getCoordinatesFromGeocode(searchLocation);
  }
}

function getCoordinatesFromGeocode(location) {
  const geocodeUrl = `https://geocode.maps.co?location=${encodeURIComponent(location)}`;

  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const latitude = data.results[0].geometry.lat;
        const longitude = data.results[0].geometry.lng;
        getSunriseSunsetByCoordinates(latitude, longitude);
      } else {
        console.error('Error retrieving coordinates from geocode API');
        alert('Unable to retrieve coordinates for the entered location. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error retrieving coordinates from geocode API:', error);
      alert('Unable to retrieve coordinates for the entered location. Please try again.');
    });
}

function getSunriseSunsetByCoordinates(latitude, longitude) {
  const apiUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayResult('Location', data))
    .catch(error => console.error('Error:', error));
}

// Add event listener to the button
document.getElementById('getSunriseSunsetBtn').addEventListener('click', getSunriseSunsetByLocation);
