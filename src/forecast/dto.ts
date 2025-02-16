import { Expose, Type } from "class-transformer";
import { BaseDto } from "../common/dto";

export class  CurrentWeatherDto extends BaseDto<CurrentWeatherDto> {
    @Expose()
    last_updated_epoch: number;
    @Expose()
    last_updated: string;
    @Expose()
    temp_c: number;
    @Expose()
    temp_f: number;
    @Expose()
    feelslike_c: number;
    @Expose()
    feelslike_f: number;
}

export class LocationDto extends BaseDto<LocationDto>{
    @Expose()
    name: string;
    @Expose()
    region: string;
    @Expose()
    country: string;
    @Expose()
    lat: number;
    @Expose()
    lon: number;
    @Expose()
    tz_id: string;
    @Expose()
    localtime_epoch: number;
    @Expose()
    localtime: string;
}


export class DayWeatherDto extends BaseDto<DayWeatherDto> {
    @Expose()
    maxtemp_c: number;
    @Expose()
    maxtemp_f: number;
    @Expose()
    mintemp_c: number;
    @Expose()
    mintemp_f: number;
    @Expose()
    avgtemp_c: number;
    @Expose()
    avgtemp_f: number;
}

export class ForecastDayDto extends BaseDto<ForecastDayDto> {
    @Expose()
    date: string;
    @Expose()
    @Type(() => DayWeatherDto)  
    day: DayWeatherDto;
}


export class ForecastDto extends BaseDto<ForecastDto> {
    @Expose()
    @Type(() => ForecastDayDto)
    forecastday: Array<ForecastDayDto>;
}

export class ForecastDataDto extends BaseDto<ForecastDataDto> {
    @Expose()
    @Type(() => LocationDto)  
    location: LocationDto;

    @Expose()
    @Type(() => CurrentWeatherDto)  
    current: CurrentWeatherDto;
    
    @Expose()
    @Type(() => ForecastDto)  
    forecast: ForecastDto
}