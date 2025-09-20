import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      service: 'MISEDA INSPECT SRL - Sistem ITP',
      timestamp: new Date().toLocaleString('ro-RO'),
      version: '1.0.0',
      features: [
        'Notificări Email',
        'Notificări SMS',
        'API RESTful',
        'Configurație securizată'
      ]
    };
  }

  @Get('api/status')
  getApiStatus() {
    return {
      api: 'active',
      database: 'connected',
      notifications: {
        email: 'configured',
        sms: 'configured'
      },
      company: 'MISEDA INSPECT SRL',
      location: 'Stația ITP',
      lastUpdate: new Date().toLocaleString('ro-RO')
    };
  }
}