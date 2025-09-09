import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('groups')
@Unique(['name'])
export class Group {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.group)
  users: User[];
}