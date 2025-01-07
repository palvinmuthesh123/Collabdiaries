import { Module } from '@nestjs/common';
import { YouTubeController } from './youtube.controller';
import { YouTubeService } from './youtube.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [YouTubeController],
  providers: [YouTubeService],
})
export class YoutubeModule {}
