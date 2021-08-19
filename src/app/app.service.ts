import { Injectable, Inject, Logger } from '@nestjs/common';
import { ApplicationLoggerService } from '../logger/logger.service';
// import tesseract from 'node-tesseract-ocr'

@Injectable()
export class AppService {

  
  constructor(private appLogger: ApplicationLoggerService){
    this.appLogger.setContext('AppService')
  }

  getHello(): string {
    this.appLogger.log('print hello')

  //   const images = ["./../assets/may-salary-slip.pdf"]
  //   const config = {
  //     lang: "eng",
  //     oem: 1,
  //     psm: 3,
  //   }
  //   tesseract
  //     .recognize(images, config)
  //     .then((text) => {
  //       console.log("Result:", text)
  //     })
  //     .catch((error) => {
  //       console.log(error.message)
  // })

    return 'Hello World!';
  }
}
