import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  WeatherApiCurrentWeatherData,
  WeatherApiService,
} from '../external/weather-api.service';

const CACHE_TTL = 12 * 60 * 60;

@Injectable()
export class WeatherService {
  constructor(
    private readonly weatherApiService: WeatherApiService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  async getWeather(city: string): Promise<WeatherApiCurrentWeatherData> {
    const cacheKey = `weather_${city.toLocaleLowerCase()}`;
    const cachedData =
      await this.cacheService.get<WeatherApiCurrentWeatherData>(cacheKey);
    if (cachedData) return cachedData;
    const currentData = await this.weatherApiService.fetchCurrent(city);
    await this.cacheService.set<WeatherApiCurrentWeatherData>(
      cacheKey,
      currentData,
      CACHE_TTL,
    );
    return currentData;
  }
}
