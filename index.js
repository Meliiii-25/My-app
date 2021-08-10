let now = new Date();
let h3 = document.querySelector("h3");

let year = now.getFullYear();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
h3.innerHTML = `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;
let form = document.querySelector("#search-city-form");
form.addEventListener("submit", displayCity);

function searchLocation(position) {
  let apiKey = "8a7369b8f8f212e0e045b301c1df404f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherConditions);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayWeatherConditions(response) {
  document.querySelector("#current-temperature").innerHTML = response.data.name;

  document.querySelector(".state").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function displayCity(event) {
  event.preventDefault();
  let apiKey = "8a7369b8f8f212e0e045b301c1df404f";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherConditions);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}

let currentLocationButton = document.querySelector(".location-button");
currentLocationButton.addEventListener("click", displayCurrentLocation);
