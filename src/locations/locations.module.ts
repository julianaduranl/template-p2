import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Character } from '../characters/entities/character.entity';
import { TokenGuard } from 'src/auth/guards/api-token.guards';
import { ApiTokenModule } from '../api-token/api-token.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Character]), ApiTokenModule],
  controllers: [LocationsController],
  providers: [LocationsService, TokenGuard],
})
export class LocationsModule {}
