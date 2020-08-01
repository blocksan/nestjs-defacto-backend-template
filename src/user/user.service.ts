import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { USERS_FIXTURE } from './user.fixture';
import { ApplicationLoggerService } from 'src/logger/logger.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
    private usersRepository: Repository<User>, private applicationLogger: ApplicationLoggerService) {
      this.applicationLogger.setContext('UserService')
     
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({email})
  }

  async saveUser(user: UserDto): Promise<User | undefined> {
    try{
      return this.usersRepository.save(user)
    }catch(err){
      this.applicationLogger.error(err)
      throw new HttpException("Exception occured while saving the user", 500)
    }
  }


  /**
   * Dummy method to insert data into the table;
   */
  async saveTempUsers(): Promise<undefined> {
    try{
      await this.usersRepository.save(USERS_FIXTURE.users)
      return
    }catch(err){
      this.applicationLogger.error(err)
      throw new HttpException("Exception occured while saving the user", 500)
    }
  }

}