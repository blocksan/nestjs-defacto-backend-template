import { Injectable } from '@nestjs/common';
import { LocationDto } from 'src/dbservices/entities/locations.entity';
import { LocationsQueries } from './location.queries';
@Injectable()
export class LocationServices {
    constructor(private locationQueries: LocationsQueries) {}

    async getLocations(options: LocationDto, projections: string[]): Promise<LocationDto[]> {
        return this.locationQueries.getLocations(options, projections)
    }

    async insert(options: LocationDto[]): Promise<any>{
        return this.locationQueries.insert(options)
    }

}
