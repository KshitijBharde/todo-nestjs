import { Injectable } from '@nestjs/common';
import { PrismaService } from './repository/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
