import { Expose } from 'class-transformer';

import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { BaseDto } from 'src/common/dto';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  city: string;
}

export class LocationDto extends BaseDto<LocationDto> {
  @Expose()
  id: number;

  @Expose()
  city: string;

  @Expose()
  userId: number;
}
