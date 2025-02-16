import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    description: 'Sign in data',
    type: SignInDto,
    examples: {
      example1: {
          summary: 'Valid request',
          value: {
            username: 'anup',
            password: '3456'
          }
      }
  }
  })
  @ApiResponse({ status: 200, description: 'Login successful', schema: {
    example: {
      accessToken: 'your-jwt-token'
    }
  }})
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}