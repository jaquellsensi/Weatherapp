// Declare the weather service
let weatherService;

// Declare controls / DOM elements
let cityDropdown;
let weatherInfoContainer;

// Event listener when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Create the weather service
    weatherService = new WeatherService();

    // Set the global variables
    cityDropdown = document.getElementById("cityDropdown");
    weatherInfoContainer = document.getElementById("weatherInfo");

    // Register events
    cityDropdown.addEventListener("change", filterCity);

    // Start loading data
    loadData();
});

// Function to load data
async function loadData() {
    const cities = [
        { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
        { name: "New York, NY", latitude: 40.7128, longitude: -74.0060 },
        { name: "Los Angeles, CA", latitude: 34.0522, longitude: -118.2437 },
        { name: "Chicago, IL", latitude: 41.8781, longitude: -87.6298 },
        { name: "Houston, TX", latitude: 29.7604, longitude: -95.3698 },
        { name: "Miami, FL", latitude: 25.7617, longitude: -80.1918 },
        { name: "Denver, CO", latitude: 39.7392, longitude: -104.9903 },
        { name: "Seattle, WA", latitude: 47.6062, longitude: -122.3321 },
        { name: "Atlanta, GA", latitude: 33.7490, longitude: -84.3880 },
        { name: "San Francisco, CA", latitude: 37.7749, longitude: -122.4194 }
    ];

    const weatherData = await weatherService.getCitiesWeatherData(cities);

    populateCityDropdown(cities);

    if (weatherData.length > 0) {
        displayWeatherInfo(weatherData[0]);
    }
}

// Function to handle city filtering
async function filterCity() {
    const selectedValue = cityDropdown.value;
    const [latitude, longitude] = selectedValue.split(',');

    const weatherData = await weatherService.getCitiesWeatherData([{ latitude, longitude }]);

    if (weatherData.length > 0) {
        displayWeatherInfo(weatherData[0]);
    } else {
        console.error(`Weather data not found for the selected city.`);
    }
}

// Function to populate the city dropdown
function populateCityDropdown(cities) {
    cities.forEach(city => {
        const option = new Option(city.name, `${city.latitude},${city.longitude}`);
        cityDropdown.add(option);
    });
}

// Function to display weather information
function displayWeatherInfo(city) {
    weatherInfoContainer.innerHTML = `
        <h3>${city.name}</h3>
        <ul>
            ${city.weather.map(period => `<li>${period.name}: ${period.temperature}°F, ${period.shortForecast}</li>`).join('')}
        </ul>
    `;
}
