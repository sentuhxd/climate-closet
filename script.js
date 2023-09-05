//DOM ELEMENTS

//DATA
var currentLatitude = 0;
var currentLongitude = 0;

//FUNCTION

//This will be a function to get someones current coordinates
window.navigator.geolocation.getCurrentPosition(function (data) {
  currentLatitude = data.coords.latitude;
  currentLongitude = data.coords.longitude;
  console.log(currentLatitude + " " + currentLongitude);
  getWeatherData();
});

//Function to use current location to get weather
var getWeatherData = function () {
  var apiUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    currentLatitude +
    "2%2C" +
    currentLongitude +
    "?unitGroup=metric&key=NAGXW443LV2TCEF9VGRU22RM9&contentType=json";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

//USER INTERACTIONS

//INITIALIZE
