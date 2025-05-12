const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const body = document.querySelector('body'); // For setting background

async function checkWeather(city) {
    const api_key = "ceaa5f73a7f13a63eff1aeaf7cc20f06";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(url).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        body.style.background = 'url("error.jpg") no-repeat center center fixed'; // Optional
        body.style.backgroundSize = 'cover';
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    const weather_main = weather_data.weather[0].main.toLowerCase();

    switch (weather_main) {
        case 'Clouds':
            body.style.background = 'url("default.jpg") no-repeat center center fixed';
            break;
        case 'clear':
            body.style.background = 'url("clear.jpg") no-repeat center center fixed';
            break;
        case 'rain':
            body.style.background = 'url("rain.jpg") no-repeat center center fixed';
            break;
        case 'snow':
            body.style.background = 'url("snow.jpg") no-repeat center center fixed';
            break;
        case 'mist':
        case 'fog':
        case 'haze':
            body.style.background = 'url("mist.jpg") no-repeat center center fixed';
            break;
        case 'thunderstorm':
            body.style.background = 'url("storm.jpg") no-repeat center center fixed';
            break;
        default:
            body.style.background = 'url("default.jpg") no-repeat center center fixed';
            break;
    }
    body.style.backgroundSize = 'cover';

    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
