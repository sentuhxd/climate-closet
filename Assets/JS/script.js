//DOM ELEMENTS
var userContainer = document.querySelector("#user-container");

//DATA
var currentLatitude = 0;
var currentLongitude = 0;
var currentUser = localStorage.getItem("current-user");
var currentUserInformation = getCurrentUserInformation();
//FUNCTION

//Function to assign the current user to their information
function getCurrentUserInformation() {
  var userList = localStorage.getItem("user-list");
  for (var i = 0; i < userList.length; i++) {
    if (currentUser === userList[i].name) {
      return userList[i];
    } else {
      console.log("ERROR NAME NOT IN LIST");
      return;
    }
  }
}

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
        displayWeatherData(data);
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
        displayAirQualityData(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

//function to get the city name for the current area
var getCity = function () {
  var apiUrl =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    currentLatitude +
    "," +
    currentLongitude +
    "&sensor=true&key=AIzaSyCcl30UlbdkG6guslJdetUBgGL6lhP5MJw";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        //displayCity(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

//This function will display the current user weather data
function displayWeatherData(data) {
  var temperature = data.currentConditions.temp;
  var uv = data.currentConditions.uvindex;
  console.log(uv);

  var tempEl = document.querySelector("#user-weather");
  tempEl.textContent = "Today's Weather: " + temperature + " °F";

  var uvEl = document.querySelector("#user-uv");
  uvEl.textContent = "UV Index: " + uv;
  userContainer.appendChild(uvEl);
}

//This function will display the current user air quailty data
// function displayAirQualityData(data) {

// }

//This function will display the current user's city
function displayCity(data) {}

//This function will initalize the data on the page
function init() {
  //Display the current name
  var nameEl = document.querySelector("#user-name");
  nameEl.textContent = currentUser;
  userContainer.appendChild(nameEl);

  //Display the user location
  getCity();

  //Display Weather Information
  getWeatherData();

  //Display
}

//USER INTERACTIONS

//INITIALIZE
//This will be a function to get someones current coordinates
window.navigator.geolocation.getCurrentPosition(function (data) {
  currentLatitude = data.coords.latitude;
  currentLongitude = data.coords.longitude;
  console.log(currentLatitude + " " + currentLongitude);

  init();
});

//Call function that will set the user profile with current user information
