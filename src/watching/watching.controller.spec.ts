import { Test, TestingModule } from '@nestjs/testing';
import { WatchingController } from './watching.controller';

describe('WatchingController', () => {
  let controller: WatchingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchingController],
    }).compile();

    controller = module.get<WatchingController>(WatchingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
