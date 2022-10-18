import { Test, TestingModule } from '@nestjs/testing';
import { WatchingService } from './watching.service';

describe('WatchingService', () => {
  let service: WatchingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatchingService],
    }).compile();

    service = module.get<WatchingService>(WatchingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
