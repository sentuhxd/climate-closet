//DOM
var userProfileButton = document.querySelector("#user-profile-button");
var userInput = document.querySelector("#first_name2");
var signUpButton = document.querySelector("#sign-up-button");
var error = document.querySelector("#errors");
var inputField = document.querySelector("#inField");

//DATA

//FUNCTIONS

//Create a function to get the local storage list and check if the user name is contained in that list
function checkName() {
  var nameList = JSON.parse(localStorage.getItem("user-list"));
  var nameBoolean = false;

  if (nameList === null) {
    console.log("ERROR NO CURRERNT USERS");
    return nameBoolean;
  }

  for (var i = 0; i < nameList.length; i++) {
    var currentPerson = nameList[i].name;

    if (currentPerson === userInput.value) {
      nameBoolean = true;
    }
  }
  //if the user is never in the list of current users then return false and error
  //If the user is true then we will update who the current user is
  if (!nameBoolean) {
    console.log("ERROR USER NOT IN LIST");
    return nameBoolean;
  } else {
    localStorage.setItem("current-user", userInput.value);
    return nameBoolean;
  }
}


//USER INTERACTIONS
//This will track when the user clicks enter on the homepage
userProfileButton.addEventListener("click", function () {
  //Call check name function
  var checkBoolean = checkName();

  if (checkBoolean) {
    window.location = "userprofile.html";
  } else {
    error.innerHTML = "Please enter a Username";
    inputField.appendChild(error);
    console.log("ERROR ENTER IN A PROPER NAME");
  }
});

signUpButton.addEventListener("click", function() {
  window.location = "questionaire.html";
});

//INITIALIZATIONS
