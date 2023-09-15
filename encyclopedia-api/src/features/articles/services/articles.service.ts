import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Article} from "../schemas/article";
import {Model} from "mongoose";
import {CreateArticleDto} from "../dtos/create-article.dto";
import {HistoryService} from "../../history/services/history.service";
import {UpdateArticleDto} from "../dtos/update-article.dto";
import {ActionTypes} from "../../history/constants/action-types";
import {ArticleUpdateService} from "../../article-update/services/article-update.service";

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>,
                private readonly historyService: HistoryService,
                private readonly articleUpdateService: ArticleUpdateService) {
    }
    getAll() {
        return this.articleModel.find().exec();
    }

    get(articleId: string) {
        return this.articleModel.find({
            _id: articleId
        });
    }

    create(createArticleDto: CreateArticleDto, userId: number) {
        let newArticle = new this.articleModel(createArticleDto);
        this.historyService.create({
            userId: userId,
            articleId: newArticle.id,
            actionType: ActionTypes.Creation
        }).then();
        return newArticle.save();
    }

    async update(updateArticleDto: UpdateArticleDto, userId: number, articleId: string) {
        return this.articleUpdateService.update(updateArticleDto, userId, articleId, ActionTypes.Updating);
    }
}
