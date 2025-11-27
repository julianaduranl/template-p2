import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from 'src/characters/entities/character.entity';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from 'src/characters/dto/create-character.dto';

@Injectable()
export class LocationsService {
  constructor(
      @InjectRepository(Character)
      private readonly characterRepository: Repository<Character>,
      @InjectRepository(Location)
      private readonly locationRepository: Repository<Location>,
    ) {}
  
    async create(dto: CreateLocationDto) {
      const { ownerid, ...data } = dto;
  
      const owner = await this.locationRepository.findOne({
        where: { id: ownerid },
      });
      if (!owner) {
        throw new NotFoundException('Owner not found');
      }
  
      const char = this.characterRepository.create({ ...data, owner });
  
      return await this.characterRepository.save(char);
    }
  
    findAll() {
      return this.characterRepository.find({
        relations: ['property', 'favPlaces'],
      });
    }
  
    async findOne(id: string) {
      const character = await this.characterRepository.findOne({
        where: { id },
        relations: ['property', 'favPlaces'],
      });
  
      if (!character) {
        throw new NotFoundException();
      }
  
      return character;
    }
}
