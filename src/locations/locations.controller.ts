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
    BadRequestException
  } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard'
import { LocationsService } from './locations.service';
import { HttpApiResponse } from 'src/common/interfaces/api-response.interface';
import { LocationDto, CreateLocationDto } from './dto/dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
  
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('locations')
export class LocationsController {
    constructor(
        private readonly locationsService: LocationsService
    ) {}

    @ApiOperation({ summary: 'Add a location to user’s favorites' })
    @ApiBody({
        description: 'Location data',
        type: CreateLocationDto,
        examples: {
            example1: {
                summary: 'Valid request',
                value: {
                    city: 'Paris'
                }
            }
        }
    })
    @ApiResponse({ 
        status: 200, 
        examples: {
            example1: {
                summary: 'Valid response',
                value: {
                    city: 'Paris',
                    id: 1,
                    userId:1
                }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'City parameter is required or already saved' })
    @Post()
    async create(
        @Body() postData: CreateLocationDto,
        @Request() req,
    ): Promise<HttpApiResponse<LocationDto>> {

        if (!postData.city) {
            throw new BadRequestException('City parameter is required');
          }

        const flag = await this.locationsService.existCityForUser(postData.city, req.user.userId);
        if (flag) {
            throw new BadRequestException('Already saved as favorite location');
        }
        const data=await this.locationsService.create(postData.city, req.user.userId);
        return { success: true, data };
    }

    @ApiOperation({ summary: 'Remove a location from favorites' })
    @ApiParam({ name: 'id', type: 'number', description: 'Location ID' })
    @ApiResponse({ status: 200, examples: {
        example1: {
            summary: 'Valid response',
            value: {
                success:true
            }
        }
    }  })
    @ApiResponse({ status: 404, description: 'Location not found for user' })
    @Delete(":id")
    async delete(
        @Param('id') id: number,
        @Request() req,
    ): Promise<HttpApiResponse> {
        
        const flag = await this.locationsService.existForUser(id, req.user.userId);
        if (flag === false) {
            throw new NotFoundException('Location not found for user');
        }
        await this.locationsService.delete(id, req.user.userId);
        return { success: true };
       
        
    }

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
                            userId:1
                        },
                        {
                            city: 'Pune',
                            id: 2,
                            userId:1
                        }
                    ]
                }
            }
        }  
    })
    @Get()
    async get(
        @Request() req,
    ): Promise<HttpApiResponse<Array<LocationDto>>> {
        const data = await this.locationsService.findAllByUserId(req.user.id);
        return {
            success: true,
            data
        }
    }
}
