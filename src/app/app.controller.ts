import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ApplicationLoggerService } from 'src/logger/logger.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import {Client, Transport, ClientProxy, EventPattern, MessagePattern} from '@nestjs/microservices'

@Controller('app')
export class AppController {

  @Client({ transport: Transport.NATS })
  client: ClientProxy;

  constructor(private readonly appService: AppService, private appLogger: ApplicationLoggerService) {
   this.appLogger.setContext('AppController')
  }

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Inject()
  private configService: ConfigService

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    this.appLogger.log(`AppController in controller ${this.configService.get("DB_TYPE")}`)
    return this.appService.getHello();
  }

  /**
   * 
   * Testing route created for hybrid microservice app
   *
   */
  @Get('messagepattern')
  revertFromMicroservice(){
    this.client.send<number>('via_http_message', "Hello from client").subscribe((data) => {
      this.appLogger.log(data)
    });   
  }

  @EventPattern('via_micro_event')
  messageFromMicroservice(message: string){
    this.appLogger.log(`Event received from microservice ${message}`)
    this.appLogger.log(message)
  }
  
}
