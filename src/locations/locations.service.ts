import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

/**
 * Service for managing locations.
 */
@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  /**
   * Creates a new location for a user.
   * @param city - The name of the city.
   * @param userId - The ID of the user.
   * @returns The created Location object.
   */
  async create(city: string, userId: number): Promise<Location> {
    return await this.locationsRepository.save({
      city,
      userId,
    });
  }

  /**
   * Deletes a location by ID for a specific user.
   * @param id - The ID of the location to delete.
   * @param userId - The ID of the user.
   */
  async delete(id: number, userId: number): Promise<void> {
    await this.locationsRepository.delete({ id, userId });
  }

  /**
   * Finds all locations for a specific user.
   * @param userId - The ID of the user.
   * @returns An array of Location objects.
   */
  async findAllByUserId(userId: number): Promise<Location[]> {
    return await this.locationsRepository.find({
      where: { userId },
    });
  }

  /**
   * Checks if a location exists for a specific user by ID.
   * @param id - The ID of the location.
   * @param userId - The ID of the user.
   * @returns True if the location exists, otherwise false.
   */
  async existForUser(id: number, userId: number): Promise<boolean> {
    return await this.locationsRepository.existsBy({ id, userId });
  }

  /**
   * Checks if a city exists for a specific user.
   * @param city - The name of the city.
   * @param userId - The ID of the user.
   * @returns True if the city exists for the user, otherwise false.
   */
  async existCityForUser(city: string, userId: number): Promise<boolean> {
    return await this.locationsRepository.existsBy({ city, userId });
  }
}
