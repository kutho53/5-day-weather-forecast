import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';

import WeatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  const weatherData = await weatherService.getWeatherByCity(cityName); 
  // (Assuming you have a weatherService to fetch data)

  // TODO: save city to search history

});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try{
    const searchHistory = await historyService.getCities();
    res.status(200).json(searchHistory);
  } catch (error){
    console.error('cannot retrieve search history', error);
    res.status(500).json({error: 'An error occured while fetching searchHistory'})
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
