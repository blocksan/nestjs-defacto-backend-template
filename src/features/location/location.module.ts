import { Module } from '@nestjs/common';
import { ApplicationLoggerService } from 'src/logger/logger.service';
import { LocationService } from './location.service';
import { LocationQueries } from './location.queries';
import { LocationController } from './location.controller';

@Module({
  providers: [LocationService, LocationQueries, ApplicationLoggerService],
  controllers: [LocationController],
  exports:[LocationService, LocationQueries]
})
export class HospitalReportModule {}
