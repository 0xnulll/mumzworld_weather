import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppLoggerService } from './applogger.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.setRequest(req);
    res.on('finish', () => {
      this.logger.log("Request finished");
    });
    next();
    
  }
}
