import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Handle successful responses
        return {
          success: 1,
          statusCode: 200, // Always 200 for successful responses
          message: 'Request successful',
          data,
        } as ResponseDto;
      }),
      catchError((error) => {
        let formattedErrorResponse: ResponseDto;
        let status = 500; // Default to 500 Internal Server Error

        if (error instanceof HttpException) {
          const response = error.getResponse();
          status = error.getStatus();

          // Format the error response
          formattedErrorResponse = {
            success: 0,
            statusCode: status,
            message: response['message'] || 'An error occurred',
            error: response['error'] || 'Unknown error',
          };
        } else {
          // Handle non-HttpException errors
          formattedErrorResponse = {
            success: 0,
            statusCode: status,
            message: 'An unexpected error occurred',
            error: error.message || 'Unknown error',
          };
        }

        // Return the formatted error response as an observable
        return throwError(
          () => new HttpException(formattedErrorResponse, status),
        );
      }),
    );
  }
}
