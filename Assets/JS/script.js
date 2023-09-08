//DOM ELEMENTS
var userContainer = document.querySelector("#user-container");

//DATA
var currentLatitude = 0;
var currentLongitude = 0;
var currentTemperature = 0;
var currentAqi = 0;
var currentUV = 0;
var currentWeatherCondition = "";
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

var clothing = {
  topList: new Set(topList),
  bottomList: new Set(bottomList),
  shoeList: new Set(shoeList),
  accessorieList: new Set(accessorieList),
  suggestionList: new Set(),
};
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
        currentTemperature = data.currentConditions.temp;
        currentWeatherCondition = data.currentConditions.conditions;
        currentUV = data.currentConditions.uvindex;
        displayWeatherData(data);
        getAirQuality();
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
        currentAqi = data.data.aqi;
        displayAirQualityData(data);
        createWardrobe();
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
        getWeatherData();
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
    zoom: 10,
    center: currentLocation,
  });
  var marker = new google.maps.Marker({ position: currentLocation, map: map });
}

//function to select wardrobe for the day
function createWardrobe() {
  console.log(currentUserInformation);

  if (currentUserInformation.answers[4] === "No") {
    clothing.topList.delete("rain-coat");
    clothing.topList.delete("winter-coat");
    clothing.shoeList.delete("snow-boots");
    clothing.shoeList.delete("rain-boots");
    clothing.accessorieList.delete("umbrella");
  }

  console.log(clothing);

  if (currentUserInformation.answers[5] === "No") {
    clothing.topList.delete("sweater");
    clothing.topList.delete("light-jacket");
  }

  if (currentUserInformation.answers[6] === "No") {
    clothing.accessorieList.delete("mask");
  }

  if (currentUserInformation.answers[7] === "No") {
    clothing.accessorieList.delete("hat");
    clothing.accessorieList.delete("sunglasses");
  }

  if (currentUserInformation.answers[9] === "Yes") {
    clothing.bottomList.delete("shorts");
    clothing.topList.delete("t-shirt-image");
  }

  //Setting temperature bases
  var preferedTemp = 0;

  //Prefered season
  if (currentUserInformation.answers[1] === "Summer") {
    preferedTemp = 70;
  } else if (currentUserInformation.answers[1] === "Winter") {
    preferedTemp = 50;
  } else if (currentUserInformation.answers[1] === "Spring") {
    preferedTemp = 65;
    console.log("HERERERERERR" + preferedTemp);
  } else if (currentUserInformation.answers[1] === "Fall") {
    preferedTemp = 55;
  }

  //Prefer cooler or warmer
  if (currentUserInformation.answers[2] === "Warmer") {
    preferedTemp += 5;
  } else {
    preferedTemp -= 5;
  }

  // var currentTemperature = 0;
  // var currentAqi = 0;
  // var currentUV = 0;
  // var currentWeatherCondition = "";
  currentWeatherCondition = "rain";
  console.log(currentTemperature + " " + preferedTemp);
  currentTemperature = 41;

  //Setting clothes based on weather conditrion and temp

  if (currentWeatherCondition.includes("Clear")) {
  } else if (currentWeatherCondition.includes("rain")) {
    //This scenario is a warmer rain (sun shower)
    if (currentTemperature > preferedTemp) {
      //accessories
      clothing.suggestionList.add("umbrella");

      //tops
      if (clothing.topList.has("t-shirt-image")) {
        clothing.suggestionList.add("t-shirt-image");
      } else {
        clothing.suggestionList.add("long-sleeve");
      }

      //bottoms
      if (clothing.bottomList.has("shorts")) {
        clothing.suggestionList.add("shorts");
      } else {
        clothing.suggestionList.add("pants");
      }

      //shoes
      if (currentUserInformation.answers[8] === "Boots") {
        if (clothing.shoeList.has("rain-boots")) {
          clothing.suggestionList.add("rain-boots");
        } else {
          clothing.suggestionList.add("sandals");
        }
      } else if (currentUserInformation.answers[8] === "Closed Toe Shoes") {
        clothing.suggestionList.add("sneakers");
      } else {
        clothing.suggestionList.add("sandals");
      }
      //This scenario is if it is raining but really cold rain
    } else if (currentTemperature < preferedTemp && currentTemperature < 40) {
      //accessories
      clothing.suggestionList.add("umbrella");
      if (clothing.accessorieList.has("hat")) {
        clothing.suggestionList.add("hat");
      }

      //tops
      clothing.suggestionList.add("sweater");
      clothing.suggestionList.add("long-sleeve");
      if (clothing.topList.has("rain-coat")) {
        clothing.suggestionList.add("rain-coat");
      }

      //bottoms
      clothing.suggestionList.add("pants");

      //shoes
      if (currentUserInformation.answers[8] === "Boots") {
        if (clothing.shoeList.has("rain-boots")) {
          clothing.suggestionList.add("rain-boots");
        } else {
          clothing.suggestionList.add("sneakers");
        }
      } else {
        clothing.suggestionList.add("sneakers");
      }

      //raining at average temp
    } else if (currentTemperature <= preferedTemp) {
      //accessories
      clothing.suggestionList.add("umbrella");
      if (clothing.accessorieList.has("hat")) {
        clothing.suggestionList.add("hat");
      }

      //tops
      clothing.suggestionList.add("light-jacket");
      clothing.suggestionList.add("long-sleeve");

      //bottoms
      clothing.suggestionList.add("pants");

      //shoes
      if (currentUserInformation.answers[8] === "Boots") {
        if (clothing.shoeList.has("rain-boots")) {
          clothing.suggestionList.add("rain-boots");
        } else {
          clothing.suggestionList.add("sneakers");
        }
      } else {
        clothing.suggestionList.add("sneakers");
      }
    }
  } else if (currentWeatherCondition.includes("snow")) {
    //No weather checks because snow will be really cold
    //accessories
    if (clothing.accessorieList.has("hat")) {
      clothing.suggestionList.add("hat");
    }

    //tops
    clothing.suggestionList.add("sweater");
    clothing.suggestionList.add("long-sleeve");
    if (clothing.topList.has("winter-coat")) {
      clothing.suggestionList.add("winter-coat");
    } else {
      clothing.suggestionList.add("light-jacket");
    }

    //Bottom
    clothing.suggestionList.add("pants");

    //shoes
    if (currentUserInformation.answers[8] === "Boots") {
      if (clothing.shoeList.has("snow-boots")) {
        clothing.suggestionList.add("snow-boots");
      } else {
        clothing.suggestionList.add("sneakers");
      }
    } else {
      clothing.suggestionList.add("sneakers");
    }
  } else if (
    currentWeatherCondition.includes("cloud") ||
    currentWeatherCondition.includes("overcast")
  ) {
  }

  console.log(clothing.suggestionList);
}

//This function will initalize the data on the page
function init() {
  //Display the current name
  var nameEl = document.querySelector("#user-name");
  nameEl.textContent = "Username: " + currentUser;
  userContainer.appendChild(nameEl);

  //Display the user location

  //Get will call get weather which calls get air quality which does createWardrobe
  getCity();
}

//USER INTERACTIONS

//INITIALIZE
//This will be a function to get someones current coordinates
window.navigator.geolocation.getCurrentPosition(function (data) {
  currentLatitude = data.coords.latitude;
  currentLongitude = data.coords.longitude;

  init();
  initMap();
});

//Call function that will set the user profile with current user information
