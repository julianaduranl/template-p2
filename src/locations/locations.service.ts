import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Character } from '../characters/entities/character.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>,
  ) {}

  async create(dto: CreateLocationDto) {
    const owner = await this.characterRepo.findOne({
      where: { id: dto.ownerId },
      relations: ['property'],
    });

    if (!owner) {
      throw new NotFoundException(`Owner ${dto.ownerId} not found`);
    }

    if (owner.property) {
      throw new BadRequestException('Owner already has a property');
    }

    const location = this.locationRepo.create({
      name: dto.name,
      type: dto.type,
      cost: dto.cost,
      owner,
    });

    const saved = await this.locationRepo.save(location);
    return saved;
  }

  findAll() {
    return this.locationRepo.find({
      relations: ['owner', 'favoriteVisitors'],
    });
  }
}
