import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from './entities/character.entity';
import { Location } from '../locations/entities/location.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>,
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {}

  async create(dto: CreateCharacterDto) {
    const character = this.characterRepo.create(dto);
    return this.characterRepo.save(character);
  }

  findAll() {
    return this.characterRepo.find({
      relations: ['property', 'favorites'],
    });
  }

  async findOne(id: string) {
    const character = await this.characterRepo.findOne({
      where: { id },
      relations: ['property', 'favorites'],
    });

    if (!character) {
      throw new NotFoundException(`Character ${id} not found`);
    }

    return character;
  }

  async addFavorite(characterId: string, locationId: string) {
    const character = await this.characterRepo.findOne({
      where: { id: characterId },
      relations: ['favorites'],
    });

    if (!character) {
      throw new NotFoundException(`Character ${characterId} not found`);
    }

    const location = await this.locationRepo.findOne({
      where: { id: locationId },
    });

    if (!location) {
      throw new NotFoundException(`Location ${locationId} not found`);
    }

    const alreadyFav = character.favorites?.some(
      (loc) => loc.id === location.id,
    );

    if (!alreadyFav) {
      character.favorites = [...(character.favorites ?? []), location];
      await this.characterRepo.save(character);
    }

    return character;
  }

  async getTaxes(id: string) {
    const character = await this.characterRepo.findOne({
      where: { id },
      relations: ['property'],
    });

    if (!character) {
      throw new NotFoundException(`Character ${id} not found`);
    }

    if (!character.property) {
      return { taxDebt: 0 };
    }

    const base = character.property.cost;

    const coef = character.employee ? 0.08 : 0.03;

    const taxDebt = base * (1 + coef);

    return { taxDebt };
  }
}
