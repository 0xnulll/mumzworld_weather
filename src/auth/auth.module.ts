import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [UsersModule,
    JwtModule.registerAsync({
      imports: [],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '240h' }
      }),
      inject: [],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[JwtModule]
})
export class AuthModule {}