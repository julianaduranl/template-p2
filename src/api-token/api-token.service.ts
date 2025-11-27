import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiToken } from './entities/api-token.entity';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ApiTokenService {
  constructor(
    @InjectRepository(ApiToken)
    private readonly tokenRepo: Repository<ApiToken>,
  ) {}

  async create() {
    const token = this.tokenRepo.create({
      token: randomUUID(),
      active: true,
      reqLeft: 10,
    });
    return this.tokenRepo.save(token);
  }

  private async findById(id: string): Promise<ApiToken> {
    const token = await this.tokenRepo.findOne({ where: { id } });
    if (!token) {
      throw new NotFoundException(`Token ${id} not found`);
    }
    return token;
  }

  private async findByToken(tokenValue: string): Promise<ApiToken> {
    const token = await this.tokenRepo.findOne({
      where: { token: tokenValue },
    });
    if (!token) {
      throw new NotFoundException(`Token with value ${tokenValue} not found`);
    }
    return token;
  }

  async canUse(id: string) {
    const token = await this.findById(id);
    return {
      id: token.id,
      canUse: token.active && token.reqLeft > 0,
      reqLeft: token.reqLeft,
    };
  }

  async reduce(id: string) {
    const token = await this.findById(id);

    if (!token.active) {
      throw new BadRequestException('Token is not active');
    }
    if (token.reqLeft <= 0) {
      throw new BadRequestException('Token has no remaining requests');
    }

    token.reqLeft -= 1;
    return this.tokenRepo.save(token);
  }

  async validateAndConsumeByToken(tokenValue: string) {
    const token = await this.findByToken(tokenValue);

    if (!token.active || token.reqLeft <= 0) {
      throw new BadRequestException('Token cannot be used');
    }

    token.reqLeft -= 1;
    await this.tokenRepo.save(token);

    return token;
  }
}
