import { Request as IRequest, Response as IResponse } from 'express';
export declare namespace Express {
    export interface Request extends IRequest {
        requestId: string;
    }

    export interface Response extends IResponse {
        requestId: string;
    }
}
