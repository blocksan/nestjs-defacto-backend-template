import { Module } from '@nestjs/common';
import { LocationsQueries } from './location.queries';
import { LocationServices } from './location.services';

@Module({
  providers: [LocationsQueries, LocationServices],
  exports:[LocationsQueries, LocationServices]
})
export class LocationModule{}
