let now = new Date();
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
let mins = now.getMinutes();

let currentDateTime = document.querySelector("#display-current-date-time");
currentDateTime.innerHTML = `${day} ${hour}:${mins}`;

function searchCity(city) {
  let apiKey = "78b9c2b6536d0f18b1f6d06979e11cbe";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

searchCity("Kuala Lumpur");

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

let handleSearch = document.querySelector("#input-city");
handleSearch.addEventListener("submit", handleSubmit);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "78b9c2b6536d0f18b1f6d06979e11cbe";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayWeather(response) {
  let displayCity = response.data.name;
  let displayCountry = response.data.sys.country;
  let displayTemperature = Math.round(response.data.main.temp);
  let displayDescription = response.data.weather[0].main;
  let displayHumidity = response.data.main.humidity;
  let displayWind = Math.round(response.data.wind.speed);

  let h1 = document.querySelector("#display-city");
  h1.innerHTML = `${displayCity}, ${displayCountry}`;

  let h5 = document.querySelector("#display-temperature");
  h5.innerHTML = `${displayTemperature}°C`;

  let h6 = document.querySelector("#display-description");
  h6.innerHTML = displayDescription;

  let showHumidity = document.querySelector("#display-humidity");
  showHumidity.innerHTML = `Humidity ${displayHumidity}% | `;

  let showWind = document.querySelector("#display-wind");
  showWind.innerHTML = `Wind speed ${displayWind} m/s`;
}
