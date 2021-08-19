import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  

  type TMessage = string;
  interface ISuccessResponse{
    [key: string]:any,
    status: true
  }
  export type SuccessResponseDto = object | object[] | string | string[] | number | number[] | boolean | ISuccessResponse ;

  export type FailureResponseDto = {
    status: false
    message: TMessage
  };
  export interface SuccessResponse<T>{
    statusCode: number;
    data: SuccessResponseDto|T;
  }
  
  @Injectable()
  export class ResponseInterceptor<T>
    implements NestInterceptor<T, SuccessResponse<T>> {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<SuccessResponse<T>> {
      return next
        .handle()
        .pipe(
          map((data) => ({
            statusCode: context.switchToHttp().getResponse().statusCode,
            status: data && data.status !== undefined ? data.status : true,
            data,
          })),
        );
    }
  }