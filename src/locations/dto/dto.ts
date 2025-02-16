import { Expose } from 'class-transformer';

import { IsString, IsNotEmpty,MinLength } from 'class-validator';

export class CreateLocationDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    city: string;
} 

export class LocationDto {
  @Expose()
  id: number;

  @Expose()
  city: string;

  @Expose()
  userId: number;
}