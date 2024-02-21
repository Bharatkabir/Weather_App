const API_KEY = `5189257f7f80a5ea428677f3f44132bb`;
const form = document.querySelector("form");
const cityName = document.querySelector("#city");
const countryName = document.querySelector("#country");
const temp = document.querySelector(".temp");
const date = document.querySelector("#date");
const img = document.querySelector("img");
const input = document.querySelector("input");
const wind = document.querySelector(".wind");
const windImg = document.querySelector("#wind");
const humnidityImg = document.querySelector("#humnidity");
const humnidity = document.querySelector(".humini");
const card = document.querySelector(".card");

const weatherGet = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  if (response.status == 404) {
    alert("Invalid city name");
    input.value = "";
  } else {
    cityName.innerText = data.name;
    countryName.innerText = data.sys.country;
    const temperatureKelvin = data.main.temp;
    const temperatureCelsius = temperatureKelvin - 273.15;
    const roundedTemperature = Math.floor(temperatureCelsius);
    getDate(date);
    temp.innerText = `${roundedTemperature}°C`;
    if (data.weather[0].main == "Haze") {
      img.src = "images/haze.png";
    } else if (data.weather[0].main == "Clouds") {
      img.src = "images/cloudy.png";
    } else if (data.weather[0].main == "Clear") {
      img.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      img.src = "images/raining.png";
    } else if (data.weather[0].main == "Smoke" && "Mist" && "Dust" && "Fog") {
      img.src = "images/smoke.png";
    } else if (data.weather[0].main == "snow") {
      img.src = "images/snow.png";
    }
    wind.innerText = `${data.wind.speed}Km/h`;
    windImg.src = "images/breeze.png";
    humnidity.innerText = `${data.main.humidity}%`;
    humnidityImg.src = "images/humidity.png";
    card.style.height = "235px";
    input.value = "";
    input.value = "";
    return false;
  }
};
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = form.querySelector("input").value;
  await weatherGet(city);
});

function getDate(date) {
  const currentDate = new Date();
  const months = [
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
    "December",
  ];
  const monthIndex = currentDate.getMonth();
  const monthName = months[monthIndex];
  const day = currentDate.getDate();
  date.innerText = `${monthName} ${day}`;
}
