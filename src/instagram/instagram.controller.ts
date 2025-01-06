import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { GenerateTokenDto } from './dto/generate-token.dto';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Post('generate-token')
  async generateToken(@Body() body: GenerateTokenDto) {
    return await this.instagramService.getInstagramLongLivedToken(body);
  }

  @Get('user-data/:accessToken')
  async getUserData(@Param('accessToken') accessToken: string) {
    return await this.instagramService.getUserData(accessToken);
  }
}
