import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserQueries } from './user.queries';
import { ApplicationLoggerService } from 'src/logger/logger.service';

@Module({
  providers: [UserService, UserQueries, ApplicationLoggerService],
  controllers: [UserController],
  exports:[UserService, UserQueries]
})
export class UserModule {}
