import {
  Controller,
  Post,
  Body,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { VerificationService } from '../verification/verification.service';
import { VerificationType } from '@prisma/client';

interface RegisterDto {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  verificationType: 'email' | 'sms';
}

interface VerifyDto {
  userId: string;
  code: string;
  type: 'email' | 'sms';
}

interface LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private verificationService: VerificationService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { email, username, verificationType } = registerDto;

    // Verific dacă utilizatorul există deja
    const existingUserByEmail = await this.usersService.findUserByEmail(email);
    if (existingUserByEmail) {
      throw new ConflictException('Email-ul este deja înregistrat');
    }

    const existingUserByUsername = await this.usersService.findUserByUsername(username);
    if (existingUserByUsername) {
      throw new ConflictException('Username-ul este deja luat');
    }

    // Validez formatul email-ului
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Format email invalid');
    }

    // Validez parola
    if (registerDto.password.length < 6) {
      throw new BadRequestException('Parola trebuie să aibă minim 6 caractere');
    }

    try {
      // Creez utilizatorul
      const user = await this.usersService.createUser({
        email: registerDto.email,
        username: registerDto.username,
        password: registerDto.password,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        phone: registerDto.phone,
      });

      // Creez verificarea
      const verificationType_enum = verificationType === 'email' 
        ? VerificationType.EMAIL_REGISTRATION 
        : VerificationType.SMS_REGISTRATION;

      const contact = verificationType === 'email' ? user.email : user.phone;
      
      if (!contact) {
        throw new BadRequestException(
          `${verificationType === 'email' ? 'Email' : 'Telefon'} este necesar pentru verificare`
        );
      }

      const verification = await this.verificationService.createVerification(
        user.id,
        verificationType_enum,
        contact,
      );

      // Trimit codul de verificare
      if (verificationType === 'email') {
        await this.authService.sendVerificationEmail(user.email, verification.code);
      } else {
        await this.authService.sendVerificationSMS(user.phone!, verification.code);
      }

      return {
        success: true,
        message: `Cod de verificare trimis prin ${verificationType === 'email' ? 'email' : 'SMS'}`,
        userId: user.id,
        verificationType,
      };
    } catch (error) {
      throw new BadRequestException(`Eroare la înregistrare: ${error.message}`);
    }
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Body() verifyDto: VerifyDto) {
    const { userId, code, type } = verifyDto;

    const verificationType = type === 'email' 
      ? VerificationType.EMAIL_REGISTRATION 
      : VerificationType.SMS_REGISTRATION;

    const result = await this.verificationService.verifyCode(
      userId,
      verificationType,
      code,
    );

    if (!result.valid) {
      throw new UnauthorizedException('Cod de verificare invalid sau expirat');
    }

    // Marchez utilizatorul ca verificat
    if (type === 'email') {
      await this.usersService.verifyEmail(userId);
    } else {
      await this.usersService.verifyPhone(userId);
    }

    // Generez token JWT
    const user = await this.usersService.findUserByEmail(
      result.verification!.contact
    );

    if (!user) {
      throw new BadRequestException('Utilizator nu a fost găsit');
    }

    const token = await this.authService.generateJwtToken(user);

    return {
      success: true,
      message: 'Cont verificat cu succes!',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
      },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Email sau parola incorectă');
    }

    const token = await this.authService.generateJwtToken(user);

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
      },
    };
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  async resendVerification(@Body() body: { userId: string; type: 'email' | 'sms' }) {
    const { userId, type } = body;

    const user = await this.usersService.findUserByEmail(userId);
    if (!user) {
      throw new BadRequestException('Utilizator nu a fost găsit');
    }

    const verificationType = type === 'email' 
      ? VerificationType.EMAIL_REGISTRATION 
      : VerificationType.SMS_REGISTRATION;

    const contact = type === 'email' ? user.email : user.phone;
    
    if (!contact) {
      throw new BadRequestException(
        `${type === 'email' ? 'Email' : 'Telefon'} nu este disponibil`
      );
    }

    const verification = await this.verificationService.createVerification(
      user.id,
      verificationType,
      contact,
    );

    // Trimit noul cod
    if (type === 'email') {
      await this.authService.sendVerificationEmail(user.email, verification.code);
    } else {
      await this.authService.sendVerificationSMS(user.phone!, verification.code);
    }

    return {
      success: true,
      message: `Cod de verificare retrimis prin ${type === 'email' ? 'email' : 'SMS'}`,
    };
  }
}