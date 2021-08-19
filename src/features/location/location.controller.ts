import { Controller, Request, Get} from '@nestjs/common';
import { ApplicationLoggerService } from 'src/logger/logger.service';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService, private appLogger: ApplicationLoggerService) {
   this.appLogger.setContext('LocationController')
  }

  @Get()
  getLocations(@Request() req): Promise<any> {
    return this.locationService.findAll()
  }

}
