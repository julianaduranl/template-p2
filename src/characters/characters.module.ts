import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { LocationsService } from 'src/locations/locations.service';
import { LocationsController } from 'src/locations/locations.controller';

@Module({
  controllers: [CharactersController],[LocationsController],
  providers: [CharactersService],[LocationsService]
})
export class CharactersModule {}
