import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { HttpApiResponse } from 'src/common/interfaces/api-response.interface';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ForecastDataDto } from './dto';

/**
 * Controller for handling weather forecast requests.
 */
@Controller('forecast')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  /**
   * Retrieves weather forecast data for a specified city.
   * @param city - The name of the city for which to retrieve the forecast.
   * @returns A promise that resolves to the weather forecast data.
   * @throws BadRequestException if the city parameter is not provided.
   */
  @ApiOperation({ summary: 'Get weather forecast data for a city' })
  @ApiParam({ name: 'city', type: String, description: 'Name of the city' })
  @ApiResponse({
    status: 200,
    description: 'Weather forecast data retrieved successfully',
    examples: {
      example1: {
        summary: 'Successful response',
        value: {
          success: true,
          data: {
            location: {
              name: 'Pune',
              region: 'Maharashtra',
              country: 'India',
              lat: 18.5333,
              lon: 73.8667,
              tz_id: 'Asia/Kolkata',
              localtime_epoch: 1739700651,
              localtime: '2025-02-16 15:40',
            },
            current: {
              last_updated_epoch: 1739700000,
              last_updated: '2025-02-16 15:30',
              temp_c: 33.2,
              temp_f: 91.7,
              feelslike_c: 31.1,
              feelslike_f: 87.9,
            },
            forecast: {
              forecastday: [
                {
                  date: '2025-02-16',
                  day: {
                    maxtemp_c: 33.2,
                    maxtemp_f: 91.7,
                    mintemp_c: 19.5,
                    mintemp_f: 67,
                    avgtemp_c: 25.9,
                    avgtemp_f: 78.6,
                  },
                },
                {
                  date: '2025-02-17',
                  day: {
                    maxtemp_c: 33.8,
                    maxtemp_f: 92.8,
                    mintemp_c: 19.6,
                    mintemp_f: 67.2,
                    avgtemp_c: 26.5,
                    avgtemp_f: 79.6,
                  },
                },
                {
                  date: '2025-02-18',
                  day: {
                    maxtemp_c: 34.9,
                    maxtemp_f: 94.8,
                    mintemp_c: 20.5,
                    mintemp_f: 68.9,
                    avgtemp_c: 27,
                    avgtemp_f: 80.5,
                  },
                },
                {
                  date: '2025-02-19',
                  day: {
                    maxtemp_c: 34.3,
                    maxtemp_f: 93.8,
                    mintemp_c: 20.1,
                    mintemp_f: 68.1,
                    avgtemp_c: 26.5,
                    avgtemp_f: 79.8,
                  },
                },
                {
                  date: '2025-02-20',
                  day: {
                    maxtemp_c: 34.3,
                    maxtemp_f: 93.7,
                    mintemp_c: 20,
                    mintemp_f: 68,
                    avgtemp_c: 26.9,
                    avgtemp_f: 80.4,
                  },
                },
              ],
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'City parameter is required' })
  @Get(':city')
  async getForecast(
    @Param('city') city: string,
  ): Promise<HttpApiResponse<ForecastDataDto>> {
    if (!city) {
      throw new BadRequestException('City parameter is required');
    }
    const data = new ForecastDataDto(
      await this.forecastService.getForecast(city),
    );
    return {
      success: true,
      data,
    };
  }
}
