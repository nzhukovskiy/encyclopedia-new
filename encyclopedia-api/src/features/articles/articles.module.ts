import {forwardRef, Module} from '@nestjs/common';
import { ArticlesController } from './controllers/articles.controller';
import { ArticlesService } from './services/articles.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Article, ArticleSchema} from "./schemas/article";
import {HistoryModule} from "../history/history.module";
import {ArchivedArticlesModule} from "../archived-articles/archived-articles.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {History} from "../history/entities/history";

@Module({
  imports: [MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema }
  ]),
      TypeOrmModule.forFeature([History]),
    forwardRef(() => HistoryModule),
    ArchivedArticlesModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService]
})
export class ArticlesModule {}
