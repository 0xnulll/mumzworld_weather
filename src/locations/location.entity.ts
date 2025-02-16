import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('locations')
@Index('IDX_LOCATION_CITY_USER', { synchronize: false })
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  userId: number;
}
