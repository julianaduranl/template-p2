import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTokenService } from './api-token.service';
import { CreateApiTokenDto } from './dto/create-api-token.dto';
import { UpdateApiTokenDto } from './dto/update-api-token.dto';

@Controller('api-token')
export class ApiTokenController {
  constructor(private readonly apiTokenService: ApiTokenService) {}

  @Post()
  create(@Body() createApiTokenDto: CreateApiTokenDto) {
    return this.apiTokenService.create(createApiTokenDto);
  }

  @Get()
  findAll() {
    return this.apiTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiTokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApiTokenDto: UpdateApiTokenDto) {
    return this.apiTokenService.update(+id, updateApiTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apiTokenService.remove(+id);
  }
}
