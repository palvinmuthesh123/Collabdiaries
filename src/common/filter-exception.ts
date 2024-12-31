import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus,} from '@nestjs/common';
import {QueryFailedError} from 'typeorm';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errorDetails: any = null;
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseBody = exception.getResponse();
            message =
                typeof responseBody === 'string'
                    ? responseBody
                    : (responseBody as any)?.message || message;
            errorDetails = typeof responseBody === 'object' ? responseBody : null;
        } else if (exception instanceof QueryFailedError) {
            // TypeORM errors
            status = HttpStatus.BAD_REQUEST;
            message = 'Database query failed';
            errorDetails = {
                query: exception.query,
                parameters: exception.parameters,
                databaseError: exception.message,
            };
        } else {
            message = exception.message || message;
            errorDetails = exception.stack || exception;
        }
        response.status(status).json(errorDetails);
    }
}
