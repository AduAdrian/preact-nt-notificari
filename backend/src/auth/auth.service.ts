import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private notificationService: NotificationService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async generateJwtToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return this.jwtService.signAsync(payload);
  }

  async sendVerificationEmail(email: string, code: string): Promise<void> {

    try {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
            <h1>🔐 MISEDA INSPECT SRL</h1>
            <p>Sistemul de Notificări pentru Stația ITP</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Codul tău de verificare</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <div style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 4px;">
                ${code}
              </div>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Introdu acest cod în aplicație pentru a-ți verifica contul.
              Codul expiră în 15 minute.
            </p>
            
            <div style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px;">
              <p style="color: #999; font-size: 12px;">
                Dacă nu ai solicitat această verificare, ignoră acest email.
                <br>
                © ${new Date().getFullYear()} MISEDA INSPECT SRL - Toate drepturile rezervate
              </p>
            </div>
          </div>
        </div>
      `;

      const result = await this.notificationService.sendEmail(
        email,
        '🔐 MISEDA INSPECT - Cod de verificare',
        htmlContent
      );
      console.log('✅ Email de verificare trimis cu succes:', result);
    } catch (error) {
      console.error('Eroare la trimiterea emailului:', error);
      throw new Error('Nu s-a putut trimite emailul de verificare');
    }
  }

  async sendVerificationSMS(phone: string, code: string): Promise<void> {
    try {
      const message = `MISEDA INSPECT - Codul de verificare: ${code}. Codul expira in 15 minute.`;
      const result = await this.notificationService.sendSMS(phone, message);
      console.log('✅ SMS de verificare trimis cu succes:', result);
    } catch (error) {
      console.error('❌ Eroare la trimiterea SMS-ului:', error);
      // Pentru dezvoltare, nu arunc eroare pentru a nu bloca înregistrarea
      console.log(`📱 SMS simulat către ${phone}: MISEDA INSPECT - Cod verificare: ${code}`);
    }
  }
}