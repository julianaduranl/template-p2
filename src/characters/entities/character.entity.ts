import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Location } from '../../locations/entities/location.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('float')
  salary: number;

  @Column({ type: 'boolean', default: false })
  employee: boolean;

  @OneToOne(() => Location, (location) => location.owner)
  property: Location;

  @ManyToMany(() => Location, (location) => location.favoriteVisitors)
  @JoinTable()
  favorites: Location[];
}
