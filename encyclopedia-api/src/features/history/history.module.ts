import {Module} from '@nestjs/common';
import { HistoryController } from './controllers/history.controller';
import { HistoryService } from './services/history.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {History} from "./entities/history";
import {UsersModule} from "../users/users.module";
import {ArchivedArticlesModule} from "../archived-articles/archived-articles.module";
import {Article, ArticleSchema} from "../articles/schemas/article";
import {MongooseModule} from "@nestjs/mongoose";
import {User} from "../users/entities/user";

@Module({
  imports: [TypeOrmModule.forFeature([History, Article, User]),
  UsersModule,
  ArchivedArticlesModule,
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema }
    ])],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService]
})
export class HistoryModule {}
