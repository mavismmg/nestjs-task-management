import { Test, TestingModule } from '@nestjs/testing';
import { TvshowsController } from './tvshows.controller';

describe('TvshowsController', () => {
  let controller: TvshowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TvshowsController],
    }).compile();

    controller = module.get<TvshowsController>(TvshowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
