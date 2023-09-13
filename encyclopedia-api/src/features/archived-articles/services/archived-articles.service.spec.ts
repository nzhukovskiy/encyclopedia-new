import { Test, TestingModule } from '@nestjs/testing';
import { ArchivedArticlesService } from './archived-articles.service';

describe('ArchivedArticlesService', () => {
  let service: ArchivedArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArchivedArticlesService],
    }).compile();

    service = module.get<ArchivedArticlesService>(ArchivedArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
