import { IsNumber, IsString } from 'class-validator';
import { Character } from 'src/characters/entities/character.entity';

export class CreateLocationDto {
  ownerid: string;
}
