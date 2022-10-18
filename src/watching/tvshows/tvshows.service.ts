import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TvshowRepository } from './tvshows-repository';

@Injectable()
export class TvshowsService {
  constructor(
    @InjectRepository(TvshowRepository)
    private tvshowsRepository: TvshowRepository,
  ) { }

  // Todo: methods
}
