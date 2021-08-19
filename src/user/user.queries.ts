import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { tableNames } from 'src/shared/constants/dbtables';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserQueries {
    constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

    async getUsers(): Promise<string> {
        return this.knex(tableNames.USER).select('*');
    }


    async getUser(options: object|any): Promise<User[]>{
        const {username}= options;
        return this.knex(tableNames.USER).select('*').where('username',username)

    }

    async saveUser(user: UserDto | UserDto[]): Promise<string> {
        try{
            return this.knex(tableNames.USER).insert(user)
        }catch(err){
            throw Error(err)
        }
    }

}
