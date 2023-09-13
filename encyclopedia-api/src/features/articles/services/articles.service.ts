import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Article} from "../schemas/article";
import {Model} from "mongoose";
import {CreateArticleDto} from "../dtos/create-article-dto";
import {HistoryService} from "../../history/services/history.service";
import {UpdateArticleDto} from "../dtos/update-article-dto";
import {ActionTypes} from "../../history/constants/action-types";
import {ArchivedArticlesService} from "../../archived-articles/services/archived-articles.service";
import {InjectRepository} from "@nestjs/typeorm";
import {History} from "../../history/entities/history";
import {Repository} from "typeorm";

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>,
                @InjectRepository(History) private readonly historyRepository: Repository<History>,
                private readonly historyService: HistoryService,
                private readonly archivedArticlesService: ArchivedArticlesService) {
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
        let currentArticleToBeUpdated = await this.articleModel.findById(articleId);
        let archivedArticle = await this.archivedArticlesService.create({
            title: currentArticleToBeUpdated.title,
            body: currentArticleToBeUpdated.body,
            birth: currentArticleToBeUpdated.birth,
            death: currentArticleToBeUpdated.death
        });
        let lastHistoryRecord = (await this.historyRepository.findBy({
            articleId: articleId
        })).find(el => el.nextArticleId == null);
        lastHistoryRecord.nextArticleId = archivedArticle._id.toString();
        await this.historyService.update(lastHistoryRecord);
        await this.historyService.create({
            previousArticleId: archivedArticle._id.toString(),
            articleId: articleId,
            actionType: ActionTypes.Updating,
            userId: userId
        })
        return this.articleModel.findByIdAndUpdate(currentArticleToBeUpdated._id, updateArticleDto, {
            new: true
        });
    }
}
