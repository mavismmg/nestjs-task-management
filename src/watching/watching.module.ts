import { Module } from '@nestjs/common';
import { WatchingService } from './watching.service';
import { WatchingController } from './watching.controller';

@Module({
  providers: [WatchingService],
  controllers: [WatchingController]
})
export class WatchingModule {}
