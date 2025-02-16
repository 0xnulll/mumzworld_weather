import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { AuthGuard } from '../auth/auth.guard';
import { LocationsService } from './locations.service';
import { BadRequestException } from '@nestjs/common';
import { CreateLocationDto } from './dto/dto';

describe('LocationsController', () => {
  let controller: LocationsController;
  let locationService: LocationsService;

  beforeEach(async () => {

    const mock_AuthGuard = { CanActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        {
            provide: LocationsService,
            useValue: {
                existCityForUser: jest.fn(),
                create: jest.fn(),
                findAllByUserId: jest.fn(),
            },
        },
    ],
    })
    .overrideGuard(AuthGuard).useValue(mock_AuthGuard)
    .compile();

    controller = module.get<LocationsController>(LocationsController);
    locationService = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should throw BadRequestException if city is not provided', async () => {
        const postData: CreateLocationDto = { city: "" }; // or {} depending on your DTO
        await expect(controller.create(postData, { user: { userId: 1 } })).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if city already exists for user', async () => {
        const postData: CreateLocationDto = { city: 'Pune' };
        jest.spyOn(locationService, 'existCityForUser').mockResolvedValue(true); // Simulate existing city
        await expect(controller.create(postData, { user: { userId: 1 } })).rejects.toThrow(BadRequestException);
    });

    it('should return success response when location is created', async () => {
        const postData: CreateLocationDto = { city: 'New York' };
        jest.spyOn(locationService, 'existCityForUser').mockResolvedValue(false); // Simulate non-existing city
        jest.spyOn(locationService, 'create').mockResolvedValue({ id: 1, city: 'Pune', userId:1 }); // Simulate created location

        const response = await controller.create(postData, { user: { userId: 1 } });
        expect(response).toEqual({ success: true, data: { id: 1, city: 'Pune', userId:1 } });
    });

    
  });
  
  describe('get', () => {
    it('should return list of city for user', async () => {
      jest.spyOn(locationService, 'findAllByUserId').mockResolvedValue([
        { id: 1, city: 'Pune', userId:1 }, { id: 2, city: 'Mumbai', userId:1 }
      ]);
      const response = await controller.get({ user: { userId: 1 } });
      expect(response).toEqual({ success: true, data: [{ id: 1, city: 'Pune', userId:1 }, { id: 2, city: 'Mumbai', userId:1 }] });
    });
  })
});
