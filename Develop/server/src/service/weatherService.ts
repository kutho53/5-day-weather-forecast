import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  placeName: string;
  latitude: number;
  longitude: number;
}
// TODO: Define a class for the Weather object
class weather {
  city: string;
  date: Date;
  icon: string;
  iconDescription: string;
  temperature: number;
  wind: number;
  humidity: number;

  constructor (city: string, date: Date, icon: string, iconDescription: string, temperature: number, wind: number, humidity: number){
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
class WeatherService {
  private baseURL?: string;
  private apiKey?: string;
  private cityName: '';

  constructor(baseURL: string, apiKey: string, cityName: '') {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = cityName;
  }

  // TODO: Create fetchLocationData method
   private async fetchLocationData(query: string) {
    try{
      if(!this.baseURL || !this.apiKey) {
        throw new Error('Invalid request');
      } {
        const data = await fetch(query).then((response) => response.json());
        return data[0];
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      return error;
    }
   }

  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}

  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}

  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}

  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
