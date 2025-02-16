import { Module } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { ForecastController } from './forecast.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { WeatherApiService } from '../external/weather-api.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [ForecastController],
  providers: [ForecastService, WeatherApiService],
})
export class ForecastModule {}
