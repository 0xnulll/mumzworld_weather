import { Controller, Get, Param,BadRequestException, ClassSerializerInterceptor, UseInterceptors, SerializeOptions } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { HttpApiResponse } from 'src/common/interfaces/api-response.interface';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CurrentWeatherDataDto } from './dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiOperation({ summary: 'Get weather data for a city' })
  @ApiParam({ name: 'city', type: String, description: 'Name of the city' })
  @ApiResponse({ 
    status: 200, 
    description: 'Weather data retrieved successfully', 
    examples: {
      example1: {
        summary: 'Successful response',
        value: {"success":true,"data":{"location":{"name":"Pune","region":"Maharashtra","country":"India","lat":18.5333,"lon":73.8667,"tz_id":"Asia/Kolkata","localtime_epoch":1739699786,"localtime":"2025-02-16 15:26"},"current":{"last_updated_epoch":1739699100,"last_updated":"2025-02-16 15:15","temp_c":33.2,"temp_f":91.7,"feelslike_c":31.1,"feelslike_f":87.9}}}
      }
    }
  })
  @ApiResponse({ status: 400, description: 'City parameter is required' })
  @Get(':city')
  async getWeather(@Param('city') city: string):Promise<HttpApiResponse<CurrentWeatherDataDto>> {
    if (!city) {
      throw new BadRequestException('City parameter is required');
    }
    const data = new CurrentWeatherDataDto(await this.weatherService.getWeather(city));
    return {
      success:true,data
    }
  }
}

