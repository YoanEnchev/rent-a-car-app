import dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({ path: '../.env' });

export default {
  // type: 'postgres',
  // host: process.env.DB_HOST,
  // port: process.env.DB_POSTGRES_PORT,
  // username: process.env.DB_USER,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // entities: ['src/**/*.entity.ts'],
  // migrations: ['src/migrations/**/*.{ts,js}'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
  // namingStrategy: new SnakeNamingStrategy()


  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_POSTGRES_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity.ts'],
  synchronize: true,
};