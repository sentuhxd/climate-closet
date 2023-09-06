//DOM ELEMENTS
var submitButton = document.querySelector("#form-submit-button");

//DATA
var userList = JSON.parse(localStorage.getItem("user-list")) || [];

//FUNCTIONS
function addPerson() {
  //Create an object for the person

  var userNameEl = document.querySelector("#user-name");
  var userName = userNameEl.value;
  var answer1El = document.querySelector("#answer1");
  var answer1 = answer1El.value;
  var answer2El = document.querySelector("#answer2");
  var answer2 = answer2El.value;
  var answer3El = document.querySelector("#answer3");
  var answer3 = answer3El.value;
  var answer4El = document.querySelector("#answer4");
  var answer4 = answer4El.value;
  var answer5El = document.querySelector("#answer5");
  var answer5 = answer5El.value;
  var answer6El = document.querySelector("#answer6");
  var answer6 = answer6El.value;
  var answer7El = document.querySelector("#answer7");
  var answer7 = answer7El.value;
  var answer8El = document.querySelector("#answer8");
  var answer8 = answer8El.value;
  var answer9El = document.querySelector("#answer9");
  var answer9 = answer9El.value;
  var answer10El = document.querySelector("#answer10");
  var answer10 = answer10El.value;

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
  };
  userList.push(personObject);
  localStorage.setItem("user-list", JSON.stringify(userList));
}

//USER INTERACTIONS
//When the finish button is clicked the person will be added to local storage
// and the page will switch to their user profile
submitButton.addEventListener("click", function () {
  addPerson();
  window.location = "userprofile.html";
});

//INITIALIZATIONS
