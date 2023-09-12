import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Article} from "../schemas/article";
import {Model} from "mongoose";
import {CreateArticleDto} from "../dtos/create-article-dto";
import {HistoryService} from "../../history/services/history.service";

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>,
                private readonly historyService: HistoryService) {
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
        this.historyService.create(userId, newArticle.id).then();
        return newArticle.save();
    }
}
