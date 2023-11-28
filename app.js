// Use AJAX to get sunrise and sunset data from the API

// Example AJAX request using jQuery
$.ajax({
    url: 'https://api.sunrise-sunset.org/json',
    method: 'GET',
    data: {
        lat: 'your_latitude',
        lng: 'your_longitude',
        date: 'today',
        formatted: 0
    },
    success: function(response) {
        // Handle the successful response and update the dashboard
        updateDashboard(response);
    },
    error: function(error) {
        // Handle errors and show an error message on the dashboard
        showError(error);
    }
});

function updateDashboard(data) {
    // Update the HTML content with data from the API response
    const dashboard = document.getElementById('dashboard');
    
    // Extract relevant information from the response
    const today = data.results;
    const tomorrow = data.results;

    // Display sunrise, sunset, dawn, dusk, day length, solar noon, and time zone information
    dashboard.innerHTML = `
        <h2>Today:</h2>
        <p>Sunrise: ${today.sunrise}</p>
        <p>Sunset: ${today.sunset}</p>
        <p>Dawn: ${today.dawn}</p>
        <p>Dusk: ${today.dusk}</p>
        <p>Day Length: ${today.day_length} seconds</p>
        <p>Solar Noon: ${today.solar_noon}</p>
        <p>Time Zone: ${data.timezone}</p>

        <h2>Tomorrow:</h2>
        <p>Sunrise: ${tomorrow.sunrise}</p>
        <p>Sunset: ${tomorrow.sunset}</p>
        <p>Dawn: ${tomorrow.dawn}</p>
        <p>Dusk: ${tomorrow.dusk}</p>
        <p>Day Length: ${tomorrow.day_length} seconds</p>
        <p>Solar Noon: ${tomorrow.solar_noon}</p>
        <p>Time Zone: ${data.timezone}</p>
    `;
}

function showError(error) {
    // Show an error message on the dashboard
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.statusText}`;
    errorMessage.style.display = 'block';
}
