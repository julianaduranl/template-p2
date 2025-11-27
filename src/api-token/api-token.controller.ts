import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTokenService } from './api-token.service';

@Controller('api-token')
export class ApiTokenController {
  constructor(private readonly apiTokenService: ApiTokenService) {}

  @Post()
  create() {
    return this.apiTokenService.create();
  }
  @Get(':id')
  canUse(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.apiTokenService.canUse(id);
  }
  @Patch('reduce/:id')
  reduce(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.apiTokenService.reduce(id);
  }
}
