import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🏭 MISEDA INSPECT SRL - Sistem ITP Digital Activ! Backend NestJS funcțional pe portul 3001. Servicii de notificare email și SMS configurate și gata de utilizare.';
  }
}