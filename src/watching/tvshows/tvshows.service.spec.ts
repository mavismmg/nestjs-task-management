import { Test, TestingModule } from '@nestjs/testing';
import { TvshowsService } from './tvshows.service';

describe('TvshowsService', () => {
  let service: TvshowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvshowsService],
    }).compile();

    service = module.get<TvshowsService>(TvshowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
