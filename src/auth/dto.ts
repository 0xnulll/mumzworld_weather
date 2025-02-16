import { Expose } from 'class-transformer';

import { IsString, IsNotEmpty,MinLength } from 'class-validator';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;



} 