import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KnexOptions, KnexOptionsFactory } from '@nestjsplus/knex';

@Injectable()
export class KnexDBConnectionService implements KnexOptionsFactory {
    constructor(private configService: ConfigService) {}

    createKnexOptions(): KnexOptions {
        const dbconfigs = this.configService.get('database');
        return {
            client: 'mysql2' || dbconfigs.KNEX_DB_TYPE,
            connection: {
                database: dbconfigs.DB_DATABASE,
                host: dbconfigs.DB_HOST,
                password: dbconfigs.DB_PASSWORD,
                port: dbconfigs.DB_PORT,
                user: dbconfigs.DB_USERNAME,
            },
            debug: dbconfigs.ENABLE_DEBUG,
            migrations:{
                directory: __dirname + '../db/migrations'
            },
            seeds:{
                directory: __dirname + '../db/seeds'
            }
        };
    }
}
