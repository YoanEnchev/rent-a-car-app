import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../ormconfig'
import { RecordsSeed } from './commands/seeder';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    HomeModule, RoleModule, UserModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    CommandModule
  ],
  providers: [RecordsSeed]
})
export class AppModule {}
