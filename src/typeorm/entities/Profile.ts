import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  age: number;
}
