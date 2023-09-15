import { Test, TestingModule } from '@nestjs/testing';
import { ArticleUpdateService } from './article-update.service';

describe('ArticleUpdateService', () => {
  let service: ArticleUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleUpdateService],
    }).compile();

    service = module.get<ArticleUpdateService>(ArticleUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
