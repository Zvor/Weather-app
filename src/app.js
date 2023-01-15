//Tuesday 16:00 - day hours:minutes
/*
1 option with function
function checkHour() {
  if (hours < 10) {
    hours = "0" + hours;
  }
  return hours;
}

function checkMin() {
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return minutes;
}

2 option - function with parameter
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;


*/

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
if (hours < 10) {
  hours = "0" + hours;
}
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
/*
1 option
checkMin();
chechHour();

2 option
minutes = checkTime(minutes)
hours = checkTime(hours)
*/

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

//changing city/temp

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#description-weather").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  celsiusTemp = response.data.main.temp;
}

function handleSearchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "60754cb629e2cd63eeb18b5d4b8e4d52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function showCurrentLocation(position) {
  let apiKey = "60754cb629e2cd63eeb18b5d4b8e4d52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

//convert C to F and back
function showCelsius(event) {
  event.preventDefault();
  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(celsiusNow);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round((celsiusNow * 9) / 5 + 32);
}

let form = document.querySelector("#submit-form");
form.addEventListener("submit", handleSearchCity);

let currentLocationButton = document.querySelector("#current-local-position");
currentLocationButton.addEventListener("click", getCurrentPosition);

let celsiusNow = null;

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", showFahrenheit);

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", showCelsius);

searchCity("Lucerne");

//weather in cities
/*
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};
*/

/*
let chooseCity = prompt("Enter a city");

if (chooseCity === "Paris") {
  alert(
    `It is currently ` +
      Math.round(weather.paris.temp) +
      `˚C in ${chooseCity} with a humidity of ${weather.paris.humidity}%`
  );
} else if (chooseCity === "Tokyo") {
  alert(
    `It is currently ` +
      Math.round(weather.tokyo.temp) +
      `˚C in ${chooseCity} with a humidity of ${weather.tokyo.humidity}%`
  );
} else if (chooseCity === "Lisbon") {
  alert(
    `It is currently ` +
      Math.round(weather.lisbon.temp) +
      `˚C in ${chooseCity} with a humidity of ${weather.lisbon.humidity}%`
  );
} else if (chooseCity === "San Francisco") {
  alert(
    `It is currently ` +
      Math.round(weather["san francisco"].temp) +
      `˚C in ${chooseCity} with a humidity of ${weather["san francisco"].humidity}%`
  );
} else if (chooseCity === "Oslo") {
  alert(
    `It is currently ` +
      Math.round(weather.oslo.temp) +
      `˚C in ${chooseCity} with a humidity of ${weather.oslo.humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${chooseCity}`
  );
}
*/
