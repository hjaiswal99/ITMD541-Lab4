function getSunriseSunset() {
  const latitude = document.getElementById('latitude').value;
  const longitude = document.getElementById('longitude').value;

  // You may add additional validation for latitude and longitude inputs here

  const apiUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayResult(data))
    .catch(error => console.error('Error:', error));
}

function displayResult(data) {
  const resultDiv = document.getElementById('result');

  if (data.status === 'OK') {
    const results = data.results;
    resultDiv.innerHTML = `
      <p>Sunrise: ${results.sunrise}</p>
      <p>Sunset: ${results.sunset}</p>
      <p>First Light: ${results.first_light}</p>
      <p>Last Light: ${results.last_light}</p>
      <!-- Add more information as needed -->
    `;
  } else {
    resultDiv.innerHTML = '<p>Error retrieving data. Please try again.</p>';
  }
}
