import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class ApplicationLogger extends Logger {}