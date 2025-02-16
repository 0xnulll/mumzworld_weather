import { Test, TestingModule } from '@nestjs/testing';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ForecastDataDto } from './dto';

describe('ForecastController', () => {
  let forecastController: ForecastController;
  let forecastService: ForecastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForecastController],
      providers: [
        {
          provide: ForecastService,
          useValue: {
            getForecast: jest.fn(),
          },
        },
      ],
    }).compile();

    forecastController = module.get<ForecastController>(ForecastController);
    forecastService = module.get<ForecastService>(ForecastService);
  });

  describe('getForecast', () => {
    it('should throw BadRequestException if city is not provided', async () => {
      await expect(forecastController.getForecast('')).rejects.toThrow(BadRequestException);
    });

    it('should return Forecast data for a valid city', async () => {
      const city = 'Pune';
      const testData = { "location": { "name": "Pune", "region": "Maharashtra", "country": "India", "lat": 18.5333, "lon": 73.8667, "tz_id": "Asia/Kolkata", "localtime_epoch": 1739630862, "localtime": "2025-02-15 20:17" }, "current": { "last_updated_epoch": 1739630700, "last_updated": "2025-02-15 20:15", "temp_c": 25.9, "temp_f": 78.7, "is_day": 0, "condition": { "text": "Clear", "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png", "code": 1000 }, "wind_mph": 6.7, "wind_kph": 10.8, "wind_degree": 312, "wind_dir": "NW", "pressure_mb": 1012, "pressure_in": 29.89, "precip_mm": 0, "precip_in": 0, "humidity": 19, "cloud": 0, "feelslike_c": 24.4, "feelslike_f": 76, "windchill_c": 25.9, "windchill_f": 78.7, "heatindex_c": 24.4, "heatindex_f": 76, "dewpoint_c": 0.5, "dewpoint_f": 32.8, "vis_km": 10, "vis_miles": 6, "uv": 0, "gust_mph": 14, "gust_kph": 22.5 }, "forecast": { "forecastday": [{ "date": "2025-02-15", "date_epoch": 1739577600, "day": { "maxtemp_c": 33.1, "maxtemp_f": 91.6, "mintemp_c": 19.6, "mintemp_f": 67.2, "avgtemp_c": 25.9, "avgtemp_f": 78.6, "maxwind_mph": 6.7, "maxwind_kph": 10.8, "totalprecip_mm": 0, "totalprecip_in": 0, "totalsnow_cm": 0, "avgvis_km": 10, "avgvis_miles": 6, "avghumidity": 21, "daily_will_it_rain": 0, "daily_chance_of_rain": 0, "daily_will_it_snow": 0, "daily_chance_of_snow": 0, "condition": { "text": "Sunny", "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png", "code": 1000 }, "uv": 2.1 } }, { "date": "2025-02-16", "date_epoch": 1739664000, "day": { "maxtemp_c": 33.6, "maxtemp_f": 92.5, "mintemp_c": 19.6, "mintemp_f": 67.3, "avgtemp_c": 26.1, "avgtemp_f": 79.1, "maxwind_mph": 9.4, "maxwind_kph": 15.1, "totalprecip_mm": 0, "totalprecip_in": 0, "totalsnow_cm": 0, "avgvis_km": 10, "avgvis_miles": 6, "avghumidity": 20, "daily_will_it_rain": 0, "daily_chance_of_rain": 0, "daily_will_it_snow": 0, "daily_chance_of_snow": 0, "condition": { "text": "Sunny", "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png", "code": 1000 }, "uv": 2.1 } }, { "date": "2025-02-17", "date_epoch": 1739750400, "day": { "maxtemp_c": 34.2, "maxtemp_f": 93.5, "mintemp_c": 19.6, "mintemp_f": 67.3, "avgtemp_c": 26.5, "avgtemp_f": 79.8, "maxwind_mph": 6.5, "maxwind_kph": 10.4, "totalprecip_mm": 0, "totalprecip_in": 0, "totalsnow_cm": 0, "avgvis_km": 10, "avgvis_miles": 6, "avghumidity": 22, "daily_will_it_rain": 0, "daily_chance_of_rain": 0, "daily_will_it_snow": 0, "daily_chance_of_snow": 0, "condition": { "text": "Sunny", "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png", "code": 1000 }, "uv": 2.2 } }, { "date": "2025-02-18", "date_epoch": 1739836800, "day": { "maxtemp_c": 35.2, "maxtemp_f": 95.4, "mintemp_c": 20.3, "mintemp_f": 68.6, "avgtemp_c": 27, "avgtemp_f": 80.5, "maxwind_mph": 15.7, "maxwind_kph": 25.2, "totalprecip_mm": 0, "totalprecip_in": 0, "totalsnow_cm": 0, "avgvis_km": 10, "avgvis_miles": 6, "avghumidity": 27, "daily_will_it_rain": 0, "daily_chance_of_rain": 0, "daily_will_it_snow": 0, "daily_chance_of_snow": 0, "condition": { "text": "Sunny", "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png", "code": 1000 }, "uv": 2.2 } }, { "date": "2025-02-19", "date_epoch": 1739923200, "day": { "maxtemp_c": 34.5, "maxtemp_f": 94.2, "mintemp_c": 20.4, "mintemp_f": 68.8, "avgtemp_c": 26.9, "avgtemp_f": 80.4, "maxwind_mph": 14.5, "maxwind_kph": 23.4, "totalprecip_mm": 0, "totalprecip_in": 0, "totalsnow_cm": 0, "avgvis_km": 10, "avgvis_miles": 6, "avghumidity": 24, "daily_will_it_rain": 0, "daily_chance_of_rain": 0, "daily_will_it_snow": 0, "daily_chance_of_snow": 0, "condition": { "text": "Sunny", "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png", "code": 1000 }, "uv": 3 } }] } }
      jest.spyOn(forecastService, 'getForecast').mockResolvedValue(testData);

      expect(await forecastController.getForecast(city)).toEqual({success:true,data:new ForecastDataDto(testData)});
    });
  });
}); 