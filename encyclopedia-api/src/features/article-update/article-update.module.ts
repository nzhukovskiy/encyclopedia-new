import {Module} from '@nestjs/common';
import { ArticleUpdateService } from './services/article-update.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Article, ArticleSchema} from "../articles/schemas/article";
import {ArchivedArticle, ArchivedArticleSchema} from "../archived-articles/entities/archived-article";
import {TypeOrmModule} from "@nestjs/typeorm";
import {History} from "../history/entities/history";
import {UsersModule} from "../users/users.module";
import {User} from "../users/entities/user";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Article.name, schema: ArticleSchema },
    { name: ArchivedArticle.name, schema: ArchivedArticleSchema }
  ]),
    TypeOrmModule.forFeature([History, User]),
  UsersModule],
  providers: [ArticleUpdateService],
  exports: [ArticleUpdateService]
})
export class ArticleUpdateModule {}
