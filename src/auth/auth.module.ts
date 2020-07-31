import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './contstants/jwt.constant';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports:[UsersModule, PassportModule, JwtModule.register({
    secret: JwtConstants.secret,
    signOptions: { expiresIn: JwtConstants.expiresIn },
  }),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}