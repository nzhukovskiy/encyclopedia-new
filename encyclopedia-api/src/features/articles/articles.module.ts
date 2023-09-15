import {Module} from '@nestjs/common';
import { ArticlesController } from './controllers/articles.controller';
import { ArticlesService } from './services/articles.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Article, ArticleSchema} from "./schemas/article";
import {HistoryModule} from "../history/history.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {History} from "../history/entities/history";
import {ArchivedArticle, ArchivedArticleSchema} from "../archived-articles/entities/archived-article";
import {ArticleUpdateModule} from "../article-update/article-update.module";

@Module({
  imports: [MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: ArchivedArticle.name, schema: ArchivedArticleSchema }
  ]),
      TypeOrmModule.forFeature([History]),
    HistoryModule,
  ArticleUpdateModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService]
})
export class ArticlesModule {}
