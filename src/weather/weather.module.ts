import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { WeatherApiService } from '../external/weather-api.service';
import { WeatherResolver } from './weather.resolver';
@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [WeatherController],
  providers: [WeatherService,WeatherApiService,WeatherResolver],
})
export class WeatherModule {}