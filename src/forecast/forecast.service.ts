import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { WeatherApiForecastData, WeatherApiService } from '../external/weather-api.service';

@Injectable()
export class ForecastService {

  constructor(
    private readonly weatherApiService: WeatherApiService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache
  ) {
      
  }

  async getForecast(city: string) : Promise<WeatherApiForecastData> {
    const cacheKey = `forecast_${city.toLocaleLowerCase()}`;
    const cachedData = await this.cacheService.get<WeatherApiForecastData>(cacheKey);
    if (cachedData) return cachedData;

    const forecastData = await this.weatherApiService.fetchForecast(city);
    await this.cacheService.set<WeatherApiForecastData>(cacheKey, forecastData, 12*60*60);
    return forecastData;
  }
} 