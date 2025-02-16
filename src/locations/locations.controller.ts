import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { LocationsService } from './locations.service';
import { HttpApiResponse } from 'src/common/interfaces/api-response.interface';
import { LocationDto, CreateLocationDto } from './dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { User } from 'src/users/dto';

/**
 * Controller for managing user favorite locations.
 */
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  /**
   * Adds a location to the user's favorites.
   * @param postData - The location data to be added.
   * @param req - The request object containing user information.
   * @returns A promise that resolves to the API response containing the created location.
   */
  @ApiOperation({ summary: 'Add a location to user’s favorites' })
  @ApiBody({
    description: 'Location data',
    type: CreateLocationDto,
    examples: {
      example1: {
        summary: 'Valid request',
        value: {
          city: 'Paris',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    examples: {
      example1: {
        summary: 'Valid response',
        value: {
          city: 'Paris',
          id: 1,
          userId: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'City parameter is required or already saved',
  })
  @Post()
  async create(
    @Body() postData: CreateLocationDto,
    @Request() req: { user: User },
  ): Promise<HttpApiResponse<LocationDto>> {
    if (!postData.city) {
      throw new BadRequestException('City parameter is required');
    }

    const flag = await this.locationsService.existCityForUser(
      postData.city,
      req.user.userId,
    );
    if (flag) {
      throw new BadRequestException('Already saved as favorite location');
    }
    const data = await this.locationsService.create(
      postData.city,
      req.user.userId,
    );
    return { success: true, data };
  }


  /** 
   * Removes a location from the user's favorites.
   * @param id - The ID of the location to be removed.
   * @param req - The request object containing user information.
   * @returns A promise that resolves to the API response indicating success.
   */
  @ApiOperation({ summary: 'Remove a location from favorites' })
  @ApiParam({ name: 'id', type: 'number', description: 'Location ID' })
  @ApiResponse({
    status: 200,
    examples: {
      example1: {
        summary: 'Valid response',
        value: {
          success: true,
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Location not found for user' })
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Request() req: { user: User },
  ): Promise<HttpApiResponse> {
    const flag = await this.locationsService.existForUser(id, req.user.userId);
    if (flag === false) {
      throw new NotFoundException('Location not found for user');
    }
    await this.locationsService.delete(id, req.user.userId);
    return { success: true };
  }


  /**
   * Retrieves the user's favorite locations.
   * @param req - The request object containing user information.
   * @returns A promise that resolves to the API response containing the list of favorite locations.
   */
  @ApiOperation({ summary: 'Retrieve the user’s favorite locations' })
  @ApiResponse({
    status: 200,
    description: 'List of favorite locations',
    examples: {
      example1: {
        summary: 'Valid response',
        value: {
          success: true,
          data: [
            {
              city: 'Paris',
              id: 1,
              userId: 1,
            },
            {
              city: 'Pune',
              id: 2,
              userId: 1,
            },
          ],
        },
      },
    },
  })
  @Get()
  async get(
    @Request() req: { user: User },
  ): Promise<HttpApiResponse<Array<LocationDto>>> {
    const data = (await this.locationsService.findAllByUserId(req.user.userId)).map((t)=>new LocationDto(t)) ;
    return {
      success: true,
      data,
    };
  }
}
