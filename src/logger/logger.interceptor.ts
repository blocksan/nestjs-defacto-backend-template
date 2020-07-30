
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    Logger,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApplicationLoggerService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {

    constructor(private applicationLogger: ApplicationLoggerService) {
        this.applicationLogger.setContext('LoggerInterceptor')
    }

    intercept(
        context: ExecutionContext,
        call$: CallHandler<any>,
    ): Observable<any> {
        
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        let body = req.body;
        body = JSON.stringify(body)
        const url = req.url;

        return call$.handle().pipe(
            tap(() => {
                this.applicationLogger.log(
                    `Request : ${req.requestId} ${method} ${url} ${body}, took ${Date.now() - now}ms`,
                    context.getClass().name,
                )
            },
            ),
        );
    }
}