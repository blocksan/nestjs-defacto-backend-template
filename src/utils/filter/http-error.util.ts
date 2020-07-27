import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, Logger} from '@nestjs/common'
import { ApplicationLogger } from 'src/services'


@Catch()
export class HttpErrorFilter implements ExceptionFilter{

    constructor(private applicationLogger: ApplicationLogger){
        this.applicationLogger.setContext('Exception')
    }

    catch(exception: HttpException, host: ArgumentsHost){
        const ctx = host.switchToHttp()
        const request = ctx.getRequest()
        const response = ctx.getResponse()
        const status = exception.getStatus()
        
        
        /**
         * prepare the custom error message
         */
        const errorResponseObject ={
            code: status,
            timestamp: new Date().toLocaleString(),
            path: request.url,
            method: request.method,
            message:
                status !== HttpStatus.INTERNAL_SERVER_ERROR
                ? exception.message || null
                : 'Internal server error',
            
        }
        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.applicationLogger.error(
                'ExceptionFilter',
              `${request.method} ${request.url}`,
              exception.stack,
            );
          } else {
            this.applicationLogger.error(
                'ExceptionFilter',
              `${request.method} ${request.url}`,
              JSON.stringify(errorResponseObject),
            );
          }
        response.status(404).json(errorResponseObject)
        
    }

}