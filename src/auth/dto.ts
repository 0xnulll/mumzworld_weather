import { IsString, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/dto';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class JWTDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}

export class JwtPayload extends User {}
