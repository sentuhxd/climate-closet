//DOM ELEMENTS
var userContainer = document.querySelector("#user-container");

//DATA
var currentLatitude = 0;
var currentLongitude = 0;
var currentUser = localStorage.getItem("current-user");
var currentUserInformation = getCurrentUserInformation();
var topList = [
  "t-shirt-image",
  "sweater",
  "long-sleeve",
  "light-jacket",
  "winter-coat",
  "rain-coat",
];
var bottomList = ["pants", "shorts"];
var shoeList = [
  "closed-toe-shoe",
  "snow-boots",
  "rain-boots",
  "sneakers",
  "sandals",
];
var accessorieList = ["hat", "sunglasses", "mask", "umbrella"];

//FUNCTION

//Function to assign the current user to their information
function getCurrentUserInformation() {
  var userList = JSON.parse(localStorage.getItem("user-list"));
  for (var i = 0; i < userList.length; i++) {
    if (currentUser === userList[i].name) {
      return userList[i];
    }
  }
  console.log("ERROR NAME NOT IN LIST");
  return;
}

//Function to use current location to get weather
var getWeatherData = function () {
  var apiUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    currentLatitude +
    "2%2C" +
    currentLongitude +
    "?unitGroup=us&key=NAGXW443LV2TCEF9VGRU22RM9&contentType=json";

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
    "&result_type=street_address&sensor=true&key=AIzaSyCcl30UlbdkG6guslJdetUBgGL6lhP5MJw";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayCity(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

//This function will display the current user weather data
function displayWeatherData(data) {
  var temperature = data.currentConditions.temp;
  var weatherCondition = data.currentConditions.conditions;
  var uv = data.currentConditions.uvindex;

  var tempEl = document.querySelector("#user-temperature");
  var conditionEl = document.querySelector("#user-weather-conditions");
  tempEl.textContent = "Today's Temperature: " + temperature + " °F";
  conditionEl.textContent = "Today's Weather Conditons: " + weatherCondition;
  userContainer.appendChild(tempEl);
  userContainer.appendChild(conditionEl);

  var uvEl = document.querySelector("#user-uv");
  uvEl.textContent = "UV Index: " + uv;
  userContainer.appendChild(uvEl);
}

//This function will display the current user air quailty data
function displayAirQualityData(data) {
  var aqi = data.data.aqi;

  var airQualityEl = document.querySelector("#user-airquality");
  var airQualitySpan = document.querySelector("#aq-span");
  airQualityEl.textContent = "Air Quality Index: ";
  airQualitySpan.textContent = aqi;

  if (aqi >= 0 && aqi <= 50) {
    airQualitySpan.setAttribute("style", "color: green");
  } else if (aqi >= 51 && aqi <= 100) {
    airQualitySpan.setAttribute("style", "color: yellow");
  } else if (aqi >= 101 && aqi <= 150) {
    airQualitySpan.setAttribute("style", "color: orange");
  } else if (aqi >= 151 && aqi <= 200) {
    airQualitySpan.setAttribute("style", "color: red");
  } else if (aqi >= 201 && aqi <= 300) {
    airQualitySpan.setAttribute("style", "color: violet");
  } else {
    airQualitySpan.setAttribute("style", "color: burgandy");
  }
  airQualityEl.appendChild(airQualitySpan);
  userContainer.appendChild(airQualityEl);
}

//This function will display the current user's city
function displayCity(data) {
  var address = data.results[0].formatted_address;
  var locationEl = document.querySelector("#user-location");
  locationEl.textContent = address;
  userContainer.appendChild(locationEl);
}

//This function will create a google map based on the current location of lat and long
function initMap() {
  var currentLocation = { lat: currentLatitude, lng: currentLongitude };
  var map = new google.maps.Map(document.querySelector("#map-container"), {
    zoom: 4,
    center: currentLocation,
  });
  var marker = new google.maps.Marker({ position: currentLocation, map: map });
}

//function to select wardrobe for the day
function createWardrobe() {
  // var topList = [
  //   "t-shirt-image",
  //   "sweater",
  //   "long-sleeve",
  //   "light-jacket",
  //   "winter-coat",
  //   "rain-coat",
  // ];
  // var bottomList = ["pants", "shorts"];
  // var shoeList = [
  //   "closed-toe-shoe",
  //   "snow-boots",
  //   "rain-boots",
  //   "sneakers",
  //   "sandals",
  // ];
  // var accessorieList = ["hat", "sunglasses", "mask", "umbrella"];
  console.log(currentUserInformation);

  if (currentUserInformation.answers[4] === "No") {
    topList.splice(4, 2);
    shoeList.splice(1, 2);
    accessorieList.splice(3, 1);
  }
}

//This function will initalize the data on the page
function init() {
  //Display the current name
  var nameEl = document.querySelector("#user-name");
  nameEl.textContent = "Username: " + currentUser;
  userContainer.appendChild(nameEl);

  //Display the user location
  getCity();

  //Display Weather Information
  getWeatherData();

  //Display air quality information
  getAirQuality();

  //Create wardrobe
  createWardrobe();
}

//USER INTERACTIONS

//INITIALIZE
//This will be a function to get someones current coordinates
window.navigator.geolocation.getCurrentPosition(function (data) {
  currentLatitude = data.coords.latitude;
  currentLongitude = data.coords.longitude;

  init();
});

//Call function that will set the user profile with current user information
