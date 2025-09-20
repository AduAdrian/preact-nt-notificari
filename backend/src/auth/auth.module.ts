import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { VerificationModule } from '../verification/verification.module';
import { NotificationModule } from '../notifications/notification.module';

@Module({
  imports: [
    UsersModule,
    VerificationModule,
    NotificationModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'fallback-secret-key',
        signOptions: { 
          expiresIn: configService.get('JWT_EXPIRES_IN') || '24h' 
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}