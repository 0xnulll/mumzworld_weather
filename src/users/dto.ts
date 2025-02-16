import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/dto';

export class User extends BaseDto<User> {
  @Expose()
  userId: number;

  @Expose()
  username: string;
}
