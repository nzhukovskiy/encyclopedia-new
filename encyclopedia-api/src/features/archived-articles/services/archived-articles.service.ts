import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ArchivedArticle} from "../entities/archived-article";
import {Model} from "mongoose";
import {CreateArticleDto} from "../../articles/dtos/create-article.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {History} from "../../history/entities/history";
import {Repository} from "typeorm";
import {Article} from "../../articles/schemas/article";
import {ArticleUpdateService} from "../../article-update/services/article-update.service";
import {UpdateArticleDto} from "../../articles/dtos/update-article.dto";
import {ActionTypes} from "../../history/constants/action-types";

@Injectable()
export class ArchivedArticlesService {
    constructor(@InjectModel(ArchivedArticle.name) private archivedArticleModel: Model<ArchivedArticle>,
                @InjectRepository(History) private readonly historyRepository: Repository<History>,
                @InjectModel(Article.name) private readonly articleModel: Model<Article>,
                private readonly articleUpdateService: ArticleUpdateService
                /*private readonly articlesService: ArticlesService*/) {
    }

    async create(createArticleDto: CreateArticleDto) {
        let archivedArticle = new this.archivedArticleModel(createArticleDto);
        return archivedArticle.save();
    }

    getById(id: string) {
        return this.archivedArticleModel.findById(id);
    }

    async restore(id: string, userId: number) {
        let articleToRestore = await this.archivedArticleModel.findById(id);
        let history = await this.historyRepository.findOne({
            where: [
                {previousArticleId: articleToRestore._id.toString()},
                {nextArticleId: articleToRestore._id.toString()}
            ]
        })
        let articleDto: UpdateArticleDto = {
            title: articleToRestore.title,
            body: articleToRestore.body,
            birth: articleToRestore.birth,
            death: articleToRestore.death,
        };
        return await this.articleUpdateService.update(articleDto, userId, history.articleId, ActionTypes.Restoring);
    }
}
