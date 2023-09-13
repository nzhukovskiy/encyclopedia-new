import { Module } from '@nestjs/common';
import { ArchivedArticlesController } from './controllers/archived-articles.controller';
import { ArchivedArticlesService } from './services/archived-articles.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ArchivedArticle, ArchivedArticleSchema} from "./entities/archived-article";

@Module({
  imports: [MongooseModule.forFeature([
    { name: ArchivedArticle.name, schema: ArchivedArticleSchema}
  ])],
  controllers: [ArchivedArticlesController],
  providers: [ArchivedArticlesService],
  exports: [ArchivedArticlesService]
})
export class ArchivedArticlesModule {}
