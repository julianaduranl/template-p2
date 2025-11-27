import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Location } from '../locations/entities/location.entity';
import { TokenGuard } from 'src/auth/guards/api-token.guards';
import { ApiTokenModule } from '../api-token/api-token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Character, Location]), ApiTokenModule],
  controllers: [CharactersController],
  providers: [CharactersService, TokenGuard],
})
export class CharactersModule {}
