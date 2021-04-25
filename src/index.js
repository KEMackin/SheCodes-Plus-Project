let now = new Date();
let currentDateTime = document.querySelector("#currentDayOfTheWeekAndTime");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
currentDateTime.innerHTML = `${day} ${hour}:${minute}`;

function searchCity(city) {
  let unit = "imperial";
  let apiKey = "1669d85569859d438e4589e00b1b14c2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTodaysWeather);
}

function showTodaysWeather(response) {
  let cityName = document.querySelector("#cityName");
  let temperatureElement = document.querySelector("#currentTemperature");
  let localCondition = document.querySelector("#localConditions");
  let localHumidity = document.querySelector("#localHumidity");
  let localWindSpeed = document.querySelector("#localWindSpeed");
  // icon

  fahrenheitTemperature = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  localCondition.innerHTML = response.data.weather[0].main;
  localHumidity.innerHTML = Math.round(response.data.main.humidity);
  localWindSpeed.innerHTML = Math.round(response.data.wind.speed);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityNameInput").value;
  searchCity(city);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "1669d85569859d438e4589e00b1b14c2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTodaysWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#currentButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemperature");
  let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let citySearch = document.querySelector("#searchButton");
citySearch.addEventListener("click", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Columbus");
