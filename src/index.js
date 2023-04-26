let options = { weekday: "long", hour: "numeric", minute: "numeric" };
let date = new Date();
let datetimeElement = document.querySelector("#datetime");
let datetimeString = date.toLocaleDateString(undefined, options);
datetimeElement.textContent = datetimeString;

let searchForm = document.querySelector("form");
let searchInput = document.querySelector("#search-input");
let resultDiv = document.querySelector("#result");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let cityName = searchInput.value;
  resultDiv.innerHTML = `<p> ${cityName}</p>`;

  searchInput.value = "";
});

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  function showTemperatureHere(response) {
    let temperature = Math.round(response.data.main.temp);
    let cityName = response.data.name;
    let temperatureHeading = `It is currently ${temperature}°C in ${cityName}`;
    let h1 = document.querySelector("h1");
    h1.innerHTML = temperatureHeading;
  }
  let apiKey = "b46ed328378ce8e49d7a4ccbf399649e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureHere);
}

navigator.geolocation.getCurrentPosition(showPosition);

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", currentLocation);
