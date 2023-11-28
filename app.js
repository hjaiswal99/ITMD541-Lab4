// Function to handle location search
function searchLocation() {
    const locationInput = document.getElementById('location-input').value;

    // Use geocode API to get latitude and longitude for the entered location
    $.ajax({
        url: 'https://geocode.maps.co/',
        method: 'GET',
        data: {
            address: locationInput
        },
        success: function(geocodeResponse) {
            // Check if geocode response contains valid data
            if (geocodeResponse.results.length > 0) {
                const location = geocodeResponse.results[0].geometry.location;

                // Call the sunrise sunset API with the obtained latitude and longitude
                getSunriseSunset(location.lat, location.lng);
            } else {
                // Show an error message for invalid location
                showError({ statusText: 'Location not found' });
            }
        },
        error: function(error) {
            // Handle errors from geocode API
            showError(error);
        }
    });
}

// Function to get sunrise and sunset data using latitude and longitude
function getSunriseSunset(latitude, longitude) {
    $.ajax({
        url: 'https://api.sunrise-sunset.org/json',
        method: 'GET',
        data: {
            lat: latitude,
            lng: longitude,
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
}

// Function to get current location and update the dashboard
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Call the sunrise sunset API with the obtained latitude and longitude
                getSunriseSunset(latitude, longitude);
            },
            function(error) {
                // Handle geolocation errors
                showError({ statusText: `Geolocation error: ${error.message}` });
            }
        );
    } else {
        // Browser does not support geolocation
        showError({ statusText: 'Geolocation is not supported by your browser' });
    }
}
