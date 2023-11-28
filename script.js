// Coordinates for New York
const latitude = 40.71427;
const longitude = -74.00597;
const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;

// Function to update the DOM with sunrise and sunset data
function updateDashboard(data) {
  document.querySelector('#sunrise-today').innerHTML = data.results.sunrise;
  document.querySelector('#sunset-today').innerHTML = data.results.sunset;
  document.querySelector('#raw-output').innerHTML = JSON.stringify(data);
}

// Fetch data on page load
fetch(url)
  .then(response => response.json())
  .then(data => updateDashboard(data))
  .catch(error => console.error('Error:', error));

// Add event listeners for search and current location buttons
document.getElementById('search-btn').addEventListener('click', function () {
  // Add logic to fetch data for the searched location and update the dashboard
  // Use geocode API to get latitude and longitude for the searched location
  // Update the 'url' variable with the new coordinates and fetch data
});

document.getElementById('current-location-btn').addEventListener('click', function () {
  // Add logic to fetch data for the current location using the Geolocation API
  // Update the 'url' variable with the new coordinates and fetch data
});
