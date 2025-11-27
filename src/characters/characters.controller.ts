import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { TokenGuard } from 'src/auth/guards/api-token.guards';
import { ApiHeader } from '@nestjs/swagger';

@UseGuards(TokenGuard)
@ApiHeader({
  name: 'api-token',
  description: 'Token de acceso devuelto por POST /api-token (campo "token")',
  required: true,
})
@Controller('character')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() dto: CreateCharacterDto) {
    return this.charactersService.create(dto);
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.charactersService.findOne(id);
  }

  @Patch(':id/favorites/:locationId')
  addFavorite(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('locationId', new ParseUUIDPipe()) locationId: string,
  ) {
    return this.charactersService.addFavorite(id, locationId);
  }

  @Get(':id/taxes')
  getTaxes(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.charactersService.getTaxes(id);
  }
}
