import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { User } from './users/dto';
import { Request } from 'express';

interface RequestWithUserDetails extends Request {
  user?: User;
}

@Injectable({ scope: Scope.REQUEST }) // Request-scoped to access per-request data
export class AppLoggerService extends ConsoleLogger {
  private request?: RequestWithUserDetails;

  setRequest(request: RequestWithUserDetails) {
    this.request = request;
  }

  private getRequestContext(): {
    method?: string;
    path?: string;
    userId?: string;
  } {
    if (!this.request) return {};

    const { method, originalUrl } = this.request;
    const userId = this.request.user ? `${this.request.user.userId}` : 'Guest';
    return { method, path: originalUrl, userId };
  }

  protected formatMessage(
    level: string,
    message: string,
    context?: string,
    trace?: string,
  ) {
    const logEntry: object = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: context || 'Application',
      trace: trace || undefined,
      ...this.getRequestContext(),
    };

    return JSON.stringify(logEntry);
  }
}
