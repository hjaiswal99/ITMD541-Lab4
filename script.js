function getSunriseSunset() {
  const latitude = document.getElementById('latitude').value;
  const longitude = document.getElementById('longitude').value;

  // You may add additional validation for latitude and longitude inputs here

  const todayUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;
  const tomorrowUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=tomorrow`;

  // Fetch data for today
  fetch(todayUrl)
    .then(response => response.json())
    .then(data => displayResult('Today', data))
    .catch(error => console.error('Error fetching today\'s data:', error));

  // Fetch data for tomorrow
  fetch(tomorrowUrl)
    .then(response => response.json())
    .then(data => displayResult('Tomorrow', data))
    .catch(error => console.error('Error fetching tomorrow\'s data:', error));
}

function displayResult(day, data) {
  const resultDiv = document.getElementById('result');

  if (data.status === 'OK') {
    const results = data.results;
    resultDiv.innerHTML += `<h2>${day}</h2>`;
    resultDiv.innerHTML += `
      <p>Sunrise: ${results.sunrise}</p>
      <p>Sunset: ${results.sunset}</p>
      <p>Dawn: ${results.dawn}</p>
      <p>Dusk: ${results.dusk}</p>
      <p>Day Length: ${results.day_length}</p>
      <p>Solar Noon: ${results.solar_noon}</p>
      <p>Timezone: ${results.timezone}</p>
      <hr>`;
  } else {
    resultDiv.innerHTML += `<h2>${day}</h2>`;
    resultDiv.innerHTML += '<p>Error retrieving data. Please try again.</p>';
    resultDiv.innerHTML += '<hr>';
  }
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        document.getElementById('latitude').value = latitude;
        document.getElementById('longitude').value = longitude;
        getSunriseSunset();
      },
      error => {
        console.error('Error getting current location:', error);
        alert('Unable to retrieve your location. Please enter manually.');
      }
    );
  } else {
    alert('Geolocation is not supported by your browser. Please enter manually.');
  }
}

// Modify the searchLocation function to accept city as a parameter
function searchLocation() {
  const city = document.getElementById('locationQuery').value;
  const geocodeApiUrl = `https://geocode.maps.co/search?city=${encodeURIComponent(city)}`;

  fetch(geocodeApiUrl)
    .then(response => response.json())
    .then(data => handleGeocodeResult(data))
    .catch(error => console.error('Error:', error));
}

function handleGeocodeResult(data) {
  if (data.results && data.results.length > 0) {
    const location = data.results[0].geometry;
    document.getElementById('latitude').value = location.lat;
    document.getElementById('longitude').value = location.lng;
    getSunriseSunset();
  } else {
    alert('Location not found. Please enter a valid location.');
  }
}
