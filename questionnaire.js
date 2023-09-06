//DOM ELEMENTS
var finishButton = document.querySelector("#finish-button");

//DATA
var userList = JSON.parse(localStorage.getItem("user-list")) || [];

//FUNCTIONS
function addPerson() {
  //Create an object for the person

  var userName = document.querySelector("#user-name");
  var answer1 = document.querySelector("#answer1");
  var answer2 = document.querySelector("#answer2");
  var answer3 = document.querySelector("#answer3");
  var answer4 = document.querySelector("#answer4");
  var answer5 = document.querySelector("#answer5");
  var answer6 = document.querySelector("#answer6");
  var answer7 = document.querySelector("#answer7");
  var answer8 = document.querySelector("#answer8");
  var answer9 = document.querySelector("#answer9");
  var answer10 = document.querySelector("#answer10");

  var personObject = {
    name: userName,
    answers: [
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      answer6,
      answer7,
      answer8,
      answer9,
      answer10,
    ],
    weight: 0,
  };
  userList.push(personObject);
  localStorage.setItem("user-list", userList);
}

//USER INTERACTIONS
//When the finish button is clicked the person will be added to local storage
// and the page will switch to their user profile
finishButton.addEventListener("click", function () {
  addPerson();
  window.location = "userprofile.html";
});

//INITIALIZATIONS
