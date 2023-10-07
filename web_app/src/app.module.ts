import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [HomeModule, UserModule, AuthModule, RoleModule],
})
export class AppModule {}
