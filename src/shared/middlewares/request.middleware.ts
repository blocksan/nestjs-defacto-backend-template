import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

type CustomReq = Request & {requestId: string}
@Injectable()
export class ReqestMiddleware implements NestMiddleware {
  use(req: CustomReq, res: Response, next: Function) {
    req.requestId = uuid()
    next();
  }
}
