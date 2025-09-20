// Test module for API endpoints
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestController } from './test.controller';
import { NotificationModule } from '../notifications/notification.module';

@Module({
  imports: [ConfigModule, NotificationModule],
  controllers: [TestController],
})
export class TestModule {}