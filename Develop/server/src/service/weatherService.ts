import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
  //creates format to request location data by entering coordinates
interface Coordinates {
  name: string;
  latitude: number;
  longitude: number;
}
// TODO: Define a class for the Weather object
  //creates a class so that we can create a weather object for each request
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  temperature: number;
  wind: number;
  humidity: number;

  constructor (city: string, date: string, icon: string, iconDescription: string, temperature: number, wind: number, humidity: number){
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.temperature = temperature;
    this.wind = wind;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
// TODO: Define the baseURL, API key, and city name properties
  //creates class for the API access information
class WeatherService {
  private baseURL?: string;
  private apiKey?: string;
  private city: string;

  constructor(city: string) {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.city = city;
  }

  // TODO: Create fetchLocationData method
    //
   private async fetchLocationData(query: string) {

   }
   

   

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(){
    return `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(this.city)}&limit=5&appid=${this.apiKey}`;
  }
  
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(data: Coordinates){
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${data.latitude}&lon=${data.longitude}&exclude=minutely,hourly&units=imperial&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    //return data from api and destructure to use data in weather url
    const query = this.buildGeocodeQuery()
    return await fetch(query)
      .then(async (response) => {
        const data = await response.json();
        const coordinates: Coordinates = { name: data.name, latitude: data.lat, longitude: data.lon };
        return coordinates;
      })
  }

  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    
  }

  // TODO: Complete getWeatherForCity method
  public async getWeatherForCity(city: string) {
    this.city = city.trim();
    //pass in city to retrieve latitude and longitude to location url
    const coord = this.fetchAndDestructureLocationData();
    //build new weather url with lon and lat
    const weatherURL = this.buildWeatherQuery(await coord)
    //return weather data as weather object
    return fetch(weatherURL)
    .then(async (response) => {
      const data = await response.json();
      const currentWeather = data.list[0];
      const weather = new Weather(
        this.city,
        new Date(currentWeather.dt_txt).toLocaleDateString(),
        currentWeather.weather[0].icon,
        currentWeather.weather[0].description,
        currentWeather.main.temp,
        currentWeather.wind.speed,
        currentWeather.main.humidity
      );
      return weather;
    })
    }


  }
}

export default new WeatherService();
