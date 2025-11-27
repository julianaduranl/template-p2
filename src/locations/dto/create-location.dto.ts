import { IsNumber, IsString } from 'class-validator';
import { Character } from 'src/characters/entities/character.entity';

export class CreateLocationDto {
  id: string;
  owner: Character;
  favCharacters: Character[];
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsNumber()
  cost: string;
}
