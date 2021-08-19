import { Injectable, HttpException } from '@nestjs/common';
import { User } from './user.entity';
import { USERS_FIXTURE } from './user.fixture';
import { ApplicationLoggerService } from 'src/logger/logger.service';
import { UserDto } from './user.dto';
import { UserQueries } from './user.queries';
import bcrypt from 'bcrypt'
import { SuccessResponseDto } from 'src/interceptors/response.interceptor';
const saltOrRounds = 10;
@Injectable()
export class UserService {

  constructor(private userQueries: UserQueries, private applicationLogger: ApplicationLoggerService) {
      this.applicationLogger.setContext('UserService')
     
  }

  async findOne(username: string): Promise<User[] | undefined> {
    return this.userQueries.getUser({username})
  }

  async saveUser(user: UserDto): Promise<SuccessResponseDto> {
    try{
      const userObj ={
        ...user,
        password: await bcrypt.hash(user.password, saltOrRounds)
      }
      await this.userQueries.saveUser(userObj)
      return {
        message: "Registration successful"
      }
    }catch(err){
      this.applicationLogger.error(err)
      throw new HttpException("Exception occured while saving the user", 500)
    }
  }


  /**
   * Dummy method to insert data into the table;
   */
  async saveTempUsers(): Promise<any> {
    try{
      await this.userQueries.saveUser(USERS_FIXTURE.users)
      return {
        status: true,
        message: "Registration successful"
      }
    }catch(err){
      this.applicationLogger.error(err)
      throw new HttpException("Exception occured while saving the user", 500)
    }
  }

}