import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class ApiToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text', { unique: true })
  token: string;
  @Column('boolean', { default: true })
  isActive: boolean;
  @Column('number', { default: 10 })
  reqleft: number;
}
