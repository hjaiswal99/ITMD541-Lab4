function searchLocation() {
    const locationInput = document.getElementById('location-input').value;

    if (locationInput.trim() === '') {
        showError({ statusText: 'Please enter a location' });
        return;
    }

    getLocationCoordinates(locationInput);
}

function getLocationCoordinates(location) {
    $.ajax({
        url: `https://geocode.maps.co/search?q=${encodeURIComponent(location)}`,
        method: 'GET',
        success: function(geocodeResponse) {
            if (geocodeResponse.results.length > 0) {
                const coordinates = geocodeResponse.results[0].geometry.location;
                getSunriseSunset(coordinates.lat, coordinates.lon);
            } else {
                showError({ statusText: 'Location not found' });
            }
        },
        error: function(error) {
            showError(error);
        }
    });
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getSunriseSunset(latitude, longitude);
            },
            function(error) {
                handleError(error);
            }
        );
    } else {
        showError({ statusText: 'Geolocation is not supported by your browser' });
    }
}

function handleError(error) {
    let errorMessage;

    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = 'An unknown error occurred.';
            break;
        default:
            errorMessage = 'An error occurred while getting user location.';
    }

    showError({ statusText: errorMessage });
}

function getSunriseSunset(latitude, longitude) {
    $.ajax({
        url: `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`,
        method: 'GET',
        success: function(response) {
            updateDashboard(response);
        },
        error: function(error) {
            showError(error);
        }
    });
}

function updateDashboard(data) {
    // Implement the updateDashboard function
    // ...
}

function showError(error) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = `Error: ${error.statusText}`;
    errorMessage.style.display = 'block';
}
