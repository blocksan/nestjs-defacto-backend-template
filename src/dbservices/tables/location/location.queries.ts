import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { LocationDto } from 'src/dbservices/entities/locations.entity';
import { tableNames } from 'src/shared/constants/dbtables';
@Injectable()
export class LocationsQueries {
    constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

    async getLocations(options: LocationDto, projections: string[]): Promise<LocationDto[]> {
        let selectParam = ['*']
        if(projections && projections.length){
            selectParam = projections
        }
        const query = this.knex(tableNames.LOCATION).select([...selectParam]);
        if(options){
            const {pinCode} = options
            if(pinCode){
                query.where(`pinCode`,pinCode)
            }
        }
        return query
    }

    async insert(options: LocationDto[]):Promise<any>{
        const query = this.knex(tableNames.LOCATION)
        if(options && Array.isArray(options)){
            query.insert(options)
        }
        return query   
}

}
