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
  getAirQuality();
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

//Function to retrieve the air quality in the current area

var getAirQuality = function () {
  var apiUrl =
    "https://api.waqi.info/feed/geo:" +
    currentLatitude +
    ";" +
    currentLongitude +
    "?token=835ba69f51164e27a1bc49f8ff790b8645c8840a";

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
