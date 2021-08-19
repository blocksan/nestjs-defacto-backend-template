import { Module } from '@nestjs/common';
import { LocationsQueries } from './location/location.queries';
import { LocationServices } from './location/location.services';
const modules = [
  LocationServices, LocationsQueries
]
@Module({
  providers: [...modules],
  exports:[...modules]
})
export class TableModule{}
