import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { TokenGuard } from 'src/auth/guards/api-token.guards';
import { ApiHeader } from '@nestjs/swagger';

@UseGuards(TokenGuard)
@ApiHeader({
  name: 'api-token',
  description: 'Token de acceso devuelto por POST /api-token (campo "token")',
  required: true,
})
@Controller('location')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  create(@Body() dto: CreateLocationDto) {
    return this.locationsService.create(dto);
  }

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }
}
