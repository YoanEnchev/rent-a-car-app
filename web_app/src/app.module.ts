import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../ormconfig'
import { RecordsSeed } from './commands/seeder';
import { CommandModule } from 'nestjs-command';
import { HandlebarsMiddleware } from './middleware/handlebars.middleware';
import { AdminModule } from './admin/admin.module';
import { isAdminMiddleware } from './middleware/is-admin.middleware';
import { CarModule } from './cars/car.module';
import { BookingModule } from './bookings/booking.module';

@Module({
  imports: [
    HomeModule, RoleModule, UserModule, AuthModule, AdminModule, CarModule, BookingModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HandlebarsMiddleware).forRoutes('*');
    consumer.apply(isAdminMiddleware).forRoutes('/admin/*');
  }
}
