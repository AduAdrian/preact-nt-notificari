import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Verification, VerificationType } from '@prisma/client';
import * as crypto from 'crypto';

@Injectable()
export class VerificationService {
  constructor(private prisma: PrismaService) {}

  async createVerification(
    userId: string,
    type: VerificationType,
    contact: string,
  ): Promise<Verification> {
    // Generez cod de verificare de 6 cifre
    const code = this.generateVerificationCode();
    
    // Setez expirarea la 15 minute
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Șterg vechile verificări neutilizate pentru același user și tip
    await this.prisma.verification.deleteMany({
      where: {
        userId,
        type,
        isUsed: false,
      },
    });

    return this.prisma.verification.create({
      data: {
        userId,
        type,
        code,
        contact,
        expiresAt,
      },
    });
  }

  async verifyCode(
    userId: string,
    type: VerificationType,
    code: string,
  ): Promise<{ valid: boolean; verification?: Verification }> {
    const verification = await this.prisma.verification.findFirst({
      where: {
        userId,
        type,
        code,
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verification) {
      return { valid: false };
    }

    // Marchez codul ca folosit
    const updatedVerification = await this.prisma.verification.update({
      where: { id: verification.id },
      data: { isUsed: true },
    });

    return { valid: true, verification: updatedVerification };
  }

  async cleanupExpiredVerifications(): Promise<void> {
    await this.prisma.verification.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  private generateVerificationCode(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  async getActiveVerification(
    userId: string,
    type: VerificationType,
  ): Promise<Verification | null> {
    return this.prisma.verification.findFirst({
      where: {
        userId,
        type,
        isUsed: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  }
}