import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import ormconfig from '../../ormconfig'

@Module({
  imports: [TypeOrmModule.forRoot({
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
  }), TypeOrmModule.forFeature([User]) ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
