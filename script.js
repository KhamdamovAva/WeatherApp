document.addEventListener('DOMContentLoaded', function () {
  const apiKey = "385d41c3dc575ae29d103ceda79f43dd";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

  const weatherIcon = document.querySelector('#weather-icon');
  const searchInput = document.querySelector('.search-box input');
  const searchButton = document.querySelector('.search-box button');
  const weather = document.querySelector('.weather');
  const error = document.querySelector('.error');

  async function checkWeather(city) {
    // получение данных
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    if (response.status === 404) {
      error.style.display = "block";
      weather.style.display = "none";
    }
    const data = await response.json();
    console.log(data, "data");
    // данные из API
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "&#8451";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    // Переключение погоды
    if (data.weather[0].main == 'Clear') {
      weatherIcon.src = './icons/sun.svg';
    } else if (data.weather[0].main == 'Rain') {
      weatherIcon.src = './icons/rain.svg';
    } else if (data.weather[0].main == 'Fog') {
      weatherIcon.src = './icons/fog.svg';
    } else if (data.weather[0].main == 'Clouds') {
      weatherIcon.src = './icons/clouds.svg';
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.src = './icons/drizzle.svg';
    } else if (data.weather[0].main == 'Snow') {
      weatherIcon.src = './icons/snow.svg';
    } else {
      weatherIcon.src = './icons/sun.svg';
    }

    weather.style.display = "block";
    error.style.display = "none";
  }

  searchButton.addEventListener('click', () => {
    if (searchInput.value.trim()) {
      checkWeather(searchInput.value);
      searchInput.value = "";
    }
  });

  // способ применения через Enter
  searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      checkWeather(searchInput.value);
      searchInput.value = "";
    }
  });
});
