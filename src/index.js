function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  return `${day} ${hour}:${minute}`;
}

function getForecast(coordinates) {
  let apiKey = "1669d85569859d438e4589e00b1b14c2";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
      <div class="weatherForecastDay">${day}</div>
      <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="" width=56px/>
      <div class="weatherForecastTemperatures">
        <span class="weatherForecastTemperatureMax">64&deg;</span>
        <span class="weatherForecastTemperatureMin">32&deg;</span>
      </div>
      </div>
    `;
  });
  forecastElement.innerHTML = forecastHTML;
}
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
  let localIconElement = document.querySelector("#icon");
  let dateAndTimeElement = document.querySelector(
    "#currentDayOfTheWeekAndTime"
  );
  fahrenheitTemperature = response.data.main.temp;
  cityName.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  localCondition.innerHTML = response.data.weather[0].main;
  localHumidity.innerHTML = Math.round(response.data.main.humidity);
  localWindSpeed.innerHTML = Math.round(response.data.wind.speed);
  localIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  localIconElement.setAttribute("alt", response.data.weather[0].description);
  dateAndTimeElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
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
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
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
