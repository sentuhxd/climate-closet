//This will be a function to get someones current coordinates
window.navigator.geolocation.getCurrentPosition(function (data) {
  var latitude = data.coords.latitude;
  var longitude = data.coords.longitude;
  console.log(latitude + " " + longitude);
});
