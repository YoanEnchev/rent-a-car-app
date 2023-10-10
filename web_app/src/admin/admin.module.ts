import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [UserModule],
  controllers: [AdminController],
  providers: [],
  exports: []
})
export class AdminModule {}
