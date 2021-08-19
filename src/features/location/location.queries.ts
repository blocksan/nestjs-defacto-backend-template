import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';

@Injectable()
export class LocationQueries {
    constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}
}
