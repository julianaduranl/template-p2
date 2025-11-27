import { Column, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from 'src/characters/entities/character.entity';

export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  name: string;
  @Column('text')
  type: string;
  @Column('number')
  cost: number;
  @OneToOne(() => Character, (character) => character.property, {
    cascade: true,
  })
  owner: Character;
  @ManyToMany(() => Character, { cascade: true })
  favCharacters: Character[];
}
