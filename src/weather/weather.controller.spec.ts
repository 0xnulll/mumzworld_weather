import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { BadRequestException } from '@nestjs/common';
import { CurrentWeatherDataDto } from './dto';

describe('WeatherController', () => {
  let weatherController: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getWeather: jest.fn(),
          },
        },
      ],
    }).compile();

    weatherController = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  describe('getWeather', () => {
    it('should throw BadRequestException if city is not provided', async () => {
      await expect(weatherController.getWeather('')).rejects.toThrow(BadRequestException);
    });

    it('should return weather data for a valid city', async () => {
      const city = 'Pune';
      const testData = {"location":{"name":"Pune","region":"Maharashtra","country":"India","lat":18.5333,"lon":73.8667,"tz_id":"Asia/Kolkata","localtime_epoch":1739628114,"localtime":"2025-02-15 19:31"},"current":{"last_updated_epoch":1739628000,"last_updated":"2025-02-15 19:30","temp_c":27.2,"temp_f":80.9,"is_day":0,"condition":{"text":"Clear","icon":"//cdn.weatherapi.com/weather/64x64/night/113.png","code":1000},"wind_mph":5.8,"wind_kph":9.4,"wind_degree":305,"wind_dir":"NW","pressure_mb":1011,"pressure_in":29.85,"precip_mm":0,"precip_in":0,"humidity":17,"cloud":0,"feelslike_c":25.4,"feelslike_f":77.6,"windchill_c":27.2,"windchill_f":80.9,"heatindex_c":25.4,"heatindex_f":77.6,"dewpoint_c":-0.2,"dewpoint_f":31.6,"vis_km":10,"vis_miles":6,"uv":0,"gust_mph":12.2,"gust_kph":19.7}};
      jest.spyOn(weatherService, 'getWeather').mockResolvedValue(testData);

      expect(await weatherController.getWeather(city)).toEqual({success:true,data:new CurrentWeatherDataDto(testData)});
    });
  });
}); 