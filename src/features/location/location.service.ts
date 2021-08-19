import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LocationDto } from 'src/dbservices/entities/locations.entity';
import { LocationServices } from 'src/dbservices/tables/location/location.services';
import { ApplicationLoggerService } from 'src/logger/logger.service';

@Injectable()
export class LocationService {

  constructor(private applicationLogger: ApplicationLoggerService){
    this.applicationLogger.setContext('Location Service')
  }

  @Inject()
  private locationServicesDB: LocationServices

  public async findAll(): Promise<LocationDto[]>{
    try{
      return this.locationServicesDB.getLocations({} as LocationDto, [])
    }catch(err){
      this.applicationLogger.error(err)
      throw new HttpException(`Exception occured : ${err ? err.message: ''}`, HttpStatus.BAD_REQUEST)
    }
  }
}
