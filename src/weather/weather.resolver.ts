import { Resolver, Query, Args } from '@nestjs/graphql';
import { WeatherService } from './weather.service';
import { CurrentWeatherDataDto } from './dto';
import { BadRequestException } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Resolver(() => CurrentWeatherDataDto)
export class WeatherResolver {
  constructor(private readonly weatherService: WeatherService) {}

  @Query(() => CurrentWeatherDataDto)
  async getWeather(@Args('city') city: string): Promise<CurrentWeatherDataDto> {
    if (!city) {
      throw new BadRequestException('City parameter is required');
    }
    return new CurrentWeatherDataDto(await this.weatherService.getWeather(city));
  }
}
