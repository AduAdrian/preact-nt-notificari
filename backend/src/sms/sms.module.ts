import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SMSProviderService } from './sms-provider.service';

@Module({
  imports: [ConfigModule],
  providers: [SMSProviderService],
  exports: [SMSProviderService],
})
export class SMSModule {}