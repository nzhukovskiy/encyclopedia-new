import { Module } from '@nestjs/common';
import { ArticlesController } from './controllers/articles.controller';
import { ArticlesService } from './services/articles.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Article, ArticleSchema} from "./schemas/article";
import {HistoryModule} from "../history/history.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  HistoryModule],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
