import fs from 'node:fs/promises';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string){
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      //overwrites the cities array with the data from the searchHistory.json file
      const data = await fs.readFile('db/db.json', 'utf8');
      const cities: City[] = JSON.parse(data);
      return cities;
    } catch (error) {
      console.error('Error reading search history: ', error);
      return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile('db/db.json', JSON.stringify(cities));
    } catch (error) {
      console.error('Error writing search history: ', error);
   }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    const cities = await this.read();
    return cities;
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.read();
    const id = (cities.length+1).toString();
    const newCity = new City(city, id);
    cities.push(newCity);
    await this.write(cities);
  }
  
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.read();
    // cities = [(name='la', id='1'), (name='san fran', id='2')];
    // cities[0].name = 'la';
    for (let i=0; i<cities.length; i++){
      if (cities[i].id === id){
        cities.splice(i, 1);
        await this.write(cities);
        break;
      }
    }
  }
}

export default new HistoryService();
