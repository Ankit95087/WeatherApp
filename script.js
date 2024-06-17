document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchbutton');
    const searchInput = document.getElementById('search');

    searchButton.addEventListener('click', fetchWeather);
    searchInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            fetchWeather();
        }
    });
});

async function fetchWeather() {
    const city = document.getElementById('search').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiKey = '3fcb6b856cc29b6d11d266e2296de790'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found!');
        }
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert(error.message);
    }
}

function updateWeather(data) {
    document.getElementById('temp').innerHTML = `<span>${Math.round(data.main.temp)}</span>℃`;
    document.getElementById('city').textContent = data.name;

    document.getElementById('humidity_value').innerHTML = `<span>${data.main.humidity}</span>%`;
    document.getElementById('windspeed_value').innerHTML = `<span>${Math.round(data.wind.speed)}</span> Km/h`;

    const weatherCondition = data.weather[0].main.toLowerCase();
    const weatherImgSrc = getWeatherImageSrc(weatherCondition);
    document.getElementById('weatherimg').src = weatherImgSrc;

    document.getElementById('weather').style.visibility = 'visible';
    document.getElementById('weathercondition').style.visibility = 'visible';
}

function getWeatherImageSrc(condition) {
    switch (condition) {
        case 'clear':
            return 'images/clear.png';
        case 'clouds':
            return 'images/clouds.png';
        case 'rain':
            return 'images/rain.png';
        case 'snow':
            return 'images/snow.png';
        case 'thunderstorm':
            return 'images/thunderstorm.png';
        default:
            return 'images/clear.png';
    }
}