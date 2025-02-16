import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import {
  WeatherApiForecastData,
  WeatherApiService,
} from '../external/weather-api.service';

const CACHE_TTL = 12 * 60 * 60;

// Forecast module service
@Injectable()
export class ForecastService {
  constructor(
    private readonly weatherApiService: WeatherApiService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  /**
   * Retrieves the weather forecast for a specified city.
   * @param city - The name of the city for which to fetch the forecast.
   * @returns A promise that resolves to the weather forecast data for the city.
   */
  async getForecast(city: string): Promise<WeatherApiForecastData> {
    const cacheKey = `forecast_${city.toLocaleLowerCase()}`;
    const cachedData =
      await this.cacheService.get<WeatherApiForecastData>(cacheKey);
    if (cachedData) return cachedData;

    const forecastData = await this.weatherApiService.fetchForecast(city);
    await this.cacheService.set<WeatherApiForecastData>(
      cacheKey,
      forecastData,
      CACHE_TTL,
    );
    return forecastData;
  }
}
