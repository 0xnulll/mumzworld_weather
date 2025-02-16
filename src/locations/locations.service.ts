import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  async create(city: string, userId: number): Promise<Location> {
    return await this.locationsRepository.save({
      city,
      userId,
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    await this.locationsRepository.delete({ id, userId });
  }

  async findAllByUserId(userId: number): Promise<Location[]> {
    return await this.locationsRepository.find({
      where: { userId },
    });
  }

  async existForUser(id: number, userId: number): Promise<boolean> {
    return await this.locationsRepository.existsBy({ id, userId });
  }

  async existCityForUser(city: string, userId: number): Promise<boolean> {
    return await this.locationsRepository.existsBy({ city, userId });
  }
}
