import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Group } from './groups/entities/group.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Arran30',
  database: 'test2',
  entities: [User, Group],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
