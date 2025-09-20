// Test controller for API testing
import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationService } from '../notifications/notification.service';

@Controller('test')
export class TestController {
  constructor(private notificationService: NotificationService) {}

  @Get('notification-status')
  async getNotificationStatus() {
    return {
      email: 'configured',
      sms: 'configured',
      company: 'MISEDA INSPECT SRL',
      status: 'active'
    };
  }

  @Post('send-test-email-v2')
  async sendTestEmail(@Body() body: { email: string }) {
    return await this.notificationService.sendEmail(
      body.email,
      '🔐 MISEDA INSPECT - Test Email',
      '<h1>Test Email Functional!</h1>'
    );
  }

  @Post('send-test-sms')
  async sendTestSMS(@Body() body: { phone: string; message?: string }) {
    const message = body.message || 'Test SMS MISEDA INSPECT - Functioneaza!';
    return await this.notificationService.sendSMS(body.phone, message);
  }
}