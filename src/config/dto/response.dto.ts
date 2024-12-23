export class ResponseDto {
  success: number; // 1 for success, 0 for failure
  statusCode: number;
  message: string;
  error?: string; // Optional field for error messages
  data?: any; // Optional field for successful data
}
