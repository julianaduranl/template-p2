import { Column, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { JoinTable } from 'typeorm/browser';
export class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  name: string;
  @Column('number')
  salary: number;
  @Column('boolean', { default: true })
  employee: boolean;
  owner: Character;
  @OneToOne(() => Location, (location) => location.owner, { cascade: true })
  property: Location;
  @ManyToMany(() => Location, { cascade: true })
  @JoinTable()
  favPlaces: Location[];
}
