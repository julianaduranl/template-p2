import { Module } from '@nestjs/common';
import { ApiTokenService } from './api-token.service';
import { ApiTokenController } from './api-token.controller';

@Module({
  controllers: [ApiTokenController],
  providers: [ApiTokenService],
})
export class ApiTokenModule {}
