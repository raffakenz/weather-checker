const APIkey = 'b8e7833d6e442049dd5d3319771029e2'
const APIurl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q='

const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const loadingElement = document.querySelector('.loading'); // Tambahkan ini

async function getWeather(city) {
    try {
        loadingElement.style.display = 'block';

        const response = await fetch(`${APIurl}${city}&appid=${APIkey}`);
        var data = await response.json();

        loadingElement.style.display = 'none';

        if (data.cod === '404') {
            alert('Kota tidak ditemukan!');
            return;
        }

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C'
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'images/clouds.png';
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'images/clear.png';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = 'images/rain.png';
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = 'images/drizzle.png';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'images/mist.png';
        } else if (data.weather[0].main == 'Snow') {
            weatherIcon.src = 'images/snow.png';
        }
    } catch (error) {
        loadingElement.style.display = 'none';
        alert('Terjadi kesalahan dalam mengambil data cuaca');
        console.error(error);
    }
}

searchButton.addEventListener('click', () => {
    getWeather(searchInput.value);
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeather(searchInput.value);
    }
});