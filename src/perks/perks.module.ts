import { Module } from '@nestjs/common';
import { PerksService } from './perks.service';
import { PerksController } from './perks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perks } from './perks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perks])],
  providers: [PerksService],
  controllers: [PerksController],
  exports: [PerksService],
})
export class PerksModule {}
