import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-firebase')
  @ApiOperation({ summary: 'login' })
  @ApiResponse({ description: 'login and Get Jwt token' })
  async login(@Body() body: { idToken: string; mobile_no: string,referral_code?:string }) {
    return this.authService.login_firebase(body.idToken, body.mobile_no,body.referral_code);
  }

  //***For Testing purpose use this route
  @Post('login_test')
  @ApiOperation({ summary: 'test' })
  @ApiResponse({ description: 'test' })
  async login_test(@Body() body: { mobile_no: string ,referral_code?:string }) {
    return this.authService.login_test(body.mobile_no,body.referral_code);
  }
}
