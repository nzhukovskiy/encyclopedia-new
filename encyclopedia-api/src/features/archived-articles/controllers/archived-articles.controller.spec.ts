import { Test, TestingModule } from '@nestjs/testing';
import { ArchivedArticlesController } from './archived-articles.controller';

describe('ArchivedArticlesController', () => {
  let controller: ArchivedArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchivedArticlesController],
    }).compile();

    controller = module.get<ArchivedArticlesController>(ArchivedArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
