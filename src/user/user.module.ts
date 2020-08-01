import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ApplicationLoggerService } from 'src/logger/logger.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UserService, ApplicationLoggerService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
