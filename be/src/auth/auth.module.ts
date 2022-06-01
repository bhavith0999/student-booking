import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../user/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [ PassportModule.register({      
    defaultStrategy: 'jwt',      
    property: 'user',      
    session: false,    
}),UsersModule,],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}