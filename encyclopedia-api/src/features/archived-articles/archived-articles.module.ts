import { Module } from '@nestjs/common';
import { ArchivedArticlesController } from './controllers/archived-articles.controller';
import { ArchivedArticlesService } from './services/archived-articles.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ArchivedArticle, ArchivedArticleSchema} from "./entities/archived-article";
import {Article, ArticleSchema} from "../articles/schemas/article";
import {TypeOrmModule} from "@nestjs/typeorm";
import {History} from "../history/entities/history";
import {ArticleUpdateModule} from "../article-update/article-update.module";

@Module({
  imports: [MongooseModule.forFeature([
    { name: ArchivedArticle.name, schema: ArchivedArticleSchema},
    { name: Article.name, schema: ArticleSchema}
  ]),
  TypeOrmModule.forFeature([History]),
  ArticleUpdateModule],
  controllers: [ArchivedArticlesController],
  providers: [ArchivedArticlesService],
  exports: [ArchivedArticlesService]
})
export class ArchivedArticlesModule {}
