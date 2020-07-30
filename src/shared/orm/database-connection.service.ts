import {Injectable} from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
// import { dbconfig } from './../config/database.config'

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory{

    constructor(private configService: ConfigService){

    }

    createTypeOrmOptions(): TypeOrmModuleOptions{
        const dbconfigs = this.configService.get('database')
        console.log(dbconfigs)
        return {
            host: dbconfigs.DB_HOST,
            type: dbconfigs.DB_TYPE,
            username: dbconfigs.DB_USERNAME,
            password: dbconfigs.DB_PASSWORD,
            database: dbconfigs.DB_DATABASE,
            entities: [],
            synchronize: true,
            logging: true,
        }
    }
}