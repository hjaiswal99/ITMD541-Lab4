function getSunriseSunset() {
  // Clear previous results
  clearResults();

  const latitude = document.getElementById('latitude').value;
  const longitude = document.getElementById('longitude').value;

  // You may add additional validation for latitude and longitude inputs here

  const todayUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;
  const tomorrowUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=tomorrow`;

  // Fetch data for today
  fetch(todayUrl)
    .then(response => response.json())
    .then(data => displayResult('Today', data))
    .catch(error => {
      console.error('Error fetching today\'s data:', error);
      displayError();
    });

  // Fetch data for tomorrow
  fetch(tomorrowUrl)
    .then(response => response.json())
    .then(data => displayResult('Tomorrow', data))
    .catch(error => {
      console.error('Error fetching tomorrow\'s data:', error);
      displayError();
    });
}

function clearResults() {
  document.getElementById('result').innerHTML = '';
}

function displayError() {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '<p>Error retrieving data. Please try again.</p>';
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
  // Clear previous results
  clearResults();

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

// Corrected searchLocation function
function searchLocation() {
    const cityInput = document.getElementById('cityInput');
    const resultElement = document.getElementById('result');

    const city = cityInput.value.trim();

    if (city === '') {
        resultElement.textContent = 'Please enter a city.';
        return;
    }

    const apiUrl = `https://geocode.maps.co/search?city=${encodeURIComponent(city)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);

            if (data && data.length > 0) {
                const firstResult = data[0];
                if (firstResult.lat && firstResult.lon) {
                    const latitude = firstResult.lat;
                    const longitude = firstResult.lon;
                    const displayName = firstResult.display_name;
                    resultElement.textContent = `Location of ${displayName}: Latitude ${latitude}, Longitude ${longitude}`;
                } else {
                    resultElement.textContent = 'Latitude and Longitude information not available for the first result.';
                }
            } else {
                resultElement.textContent = 'Location not found.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultElement.textContent = 'An error occurred while fetching data.';
        });
}
