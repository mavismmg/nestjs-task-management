import { Controller, Logger } from '@nestjs/common';
import { TvshowsService } from './tvshows.service';

@Controller('tvshows')
export class TvshowsController {
  private logger = new Logger('TvshowsController');

  constructor(private tvshowsService: TvshowsService) { }

  // Todo: methods.
}
