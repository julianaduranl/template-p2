import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(dto: CreateCharacterDto) {
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
