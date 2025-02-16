import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherApiService {
    private readonly SERVER_URL = 'https://api.weatherapi.com';
    private readonly API_KEY = process.env.WEATHER_API_KEY || 'test';
    constructor(private httpService: HttpService) {}

    async fetchCurrent(city: string):  Promise<WeatherApiCurrentWeatherData>{
        const url = `${this.SERVER_URL}/v1/current.json?key=${this.API_KEY}&q=${city}&aqi=no`;
        const response = await firstValueFrom(
            this.httpService.get(url)
        );
        return response.data as unknown as WeatherApiCurrentWeatherData
    }

    async fetchForecast(city: string, days: number = 5) : Promise<WeatherApiForecastData> {
        const url = `${this.SERVER_URL}/v1/forecast.json?key=${this.API_KEY}&q=${city}&days=${days}&aqi=no`;
        const response = await firstValueFrom<{data:WeatherApiForecastData}>(
            this.httpService.get(url)
        );
        return response.data
    }
}


interface CurrentWeather {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
}

interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

interface DayWeather {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    uv: number;
}

interface ForecastDay {
    date: string;
    date_epoch: number;
    day: DayWeather;
}

export interface WeatherApiCurrentWeatherData {
    location: Location;
    current: CurrentWeather;
}

export interface WeatherApiForecastData {
    location: Location;
    current: CurrentWeather;
    forecast: {
        forecastday : Array<ForecastDay>;
    } 
}