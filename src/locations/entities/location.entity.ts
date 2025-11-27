import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Character } from '../../characters/entities/character.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  type: string;

  @Column('float')
  cost: number;

  @OneToOne(() => Character, (character) => character.property)
  @JoinColumn()
  owner: Character;

  @ManyToMany(() => Character, (character) => character.favorites)
  favoriteVisitors: Character[];
}
