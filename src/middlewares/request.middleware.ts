import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ReqestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    req.requestId = uuid()
    next();
  }
}
