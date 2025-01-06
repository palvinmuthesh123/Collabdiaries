import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { InstagramController } from './instagram.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstagramToken } from './entities/instagram.entity';
import { InstagramScheduler } from './instagram.scheduler';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([InstagramToken]),
  ],
  controllers: [InstagramController],
  providers: [InstagramService, InstagramScheduler],
})
export class InstagramModule {}
