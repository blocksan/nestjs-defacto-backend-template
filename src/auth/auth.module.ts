import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './contstants/jwt.constant';
import { JwtStrategy } from './jwt/jwt.strategy';
import { GoogleStrategy } from './google/google.strategy';

@Module({
  imports:[UserModule, PassportModule, JwtModule.register({
    secret: JwtConstants.secret,
    signOptions: { expiresIn: JwtConstants.expiresIn },
  }),],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}