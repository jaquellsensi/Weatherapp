class WeatherService {
    baseUrl = "https://api.weather.gov/points/";

    async getCitiesWeatherData(cities) {
        const weatherDataPromises = cities.map(async (city) => {
            const apiUrl = `${this.baseUrl}/${city.latitude},${city.longitude}/forecast`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (response.ok) {
                    return {
                        name: city.name,
                        latitude: city.latitude,
                        longitude: city.longitude,
                        weather: data.properties.periods,
                    };
                } else {
                    console.error(`Error fetching weather data for ${city.name}: ${data.title}`);
                    return null;
                }
            } catch (error) {
                console.error(`Error fetching weather data for ${city.name}: ${error.message}`);
                return null;
            }
        });

        // Wait for all promises to resolve
        const results = await Promise.all(weatherDataPromises);

        // Filter out null results (failed API requests)
        return results.filter((result) => result !== null);
    }

    // Add other methods for CRUD operations if needed
}

// Example usage:
const weatherService = new WeatherService();
const cities = [
    { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
    // Add more cities as needed
];

const citiesWeatherData = await weatherService.getCitiesWeatherData(cities);
console.log(citiesWeatherData);
