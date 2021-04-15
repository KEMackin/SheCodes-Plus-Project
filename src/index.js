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
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#localConditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#localHumidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#localWindSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityNameInput").value;
  searchCity(city);
}
let citySearch = document.querySelector("#searchButton");
citySearch.addEventListener("click", handleSubmit);

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

searchCity("Columbus");
