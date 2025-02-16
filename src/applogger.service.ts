import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST }) // Request-scoped to access per-request data
export class AppLoggerService extends ConsoleLogger {
  private request?: Request;

  setRequest(request: Request) {
    this.request = request;
  }

  private getRequestContext(): any {
    if (!this.request) return {};

    const { method, originalUrl } = this.request;
    const userId = this.request['user'] ? `${this.request['user'].userId}` : 'Guest';
    return { method, PATH:originalUrl, userId };
  }

  protected formatMessage(level: string, message: string, context?: string, trace?: string) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: context || 'Application',
      trace: trace || undefined,
      ...this.getRequestContext()
    };

    return JSON.stringify(logEntry);
  }
}
