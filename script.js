let geocode = {
  reverseGeocode: function (latitude, longitude) {
    var api_url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;
    var request_url = `${api_url}/v1/json?q=${encodeURIComponent(latitude + "," + longitude)}&pretty=1&no_annotations=1`;

    var request = new XMLHttpRequest();
    request.open("GET", request_url, true);

    request.onload = function () {
      if (request.status == 200) {
        var data = JSON.parse(request.responseText);
        weather.fetchWeather(data.results[0].components.city);
      } else if (request.status <= 500) {
        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log("error msg: " + data.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function () {
      console.log("SERVER ERROR");
    };

    request.send();
  },
  getGeoLocation: function() {
    function success (data) {
      geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, onError);
    }
    else {
      weather.fetchWeather("Denver");
    }
  }
};

document.querySelector(".search button").addEventListener("click",function(){
  weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup",function(event){
  if(event.key=="Enter")
  weather.search();
});

document.querySelector(".geolocation button").addEventListener("click", () =>{
    document.querySelector(".search-bar").value="";
    geocode.getGeoLocation();
});

let weather = {
  fetchWeather: function(city){
    const api_url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;
    fetch(api_url)
    .then((response)=>{
      if (!response.ok) {
        document.querySelector("#error-message").innerText = "Please check the location for getting weather details...";
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data)=>this.displayWeather(data))
    .catch(error => {
      console.error('Error:', error);
      document.querySelector("#error-message").innerText = "Error fetching weather data.";
    });
  },

  displayWeather: function(data){
    // Implement the displayWeather function
    // ...
    console.log(data); // Use this data to update the dashboard
  },

  search: function(){
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

function onError(error){
  document.querySelector("#error-message").innerText = "Error fetching user location.";
  console.log(error.message);
}

geocode.getGeoLocation();
