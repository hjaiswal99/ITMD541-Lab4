function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        displayLocation(latitude, longitude);
      },
      error => {
        console.error('Error getting current location:', error);
        alert('Error getting current location. Please try again.');
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function searchLocation() {
  const locationInput = document.getElementById('locationSearch').value;
  if (locationInput.trim() === '') {
    alert('Please enter a location to search.');
    return;
  }

  // Update the geocode API URL with the correct endpoint and parameters
  const geocodeApiUrl = `https://geocode.maps.co/geocode?address=${encodeURIComponent(locationInput)}`;

  fetch(geocodeApiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const location = data.results[0].geometry.location;
        displayLocation(location.lat, location.lng);
      } else {
        alert('Location not found. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error searching location:', error);
      alert('Error searching location. Please try again.');
    });
}

function displayLocation(latitude, longitude) {
  document.getElementById('latitude').value = latitude;
  document.getElementById('longitude').value = longitude;
}

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

