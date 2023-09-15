import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Article} from "../../articles/schemas/article";
import {Model} from "mongoose";
import {InjectRepository} from "@nestjs/typeorm";
import {History} from "../../history/entities/history";
import {Repository} from "typeorm";
import {ArchivedArticle} from "../../archived-articles/entities/archived-article";
import {UpdateArticleDto} from "../../articles/dtos/update-article.dto";
import {ActionTypes} from "../../history/constants/action-types";

@Injectable()
export class ArticleUpdateService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>,
                @InjectRepository(History) private readonly historyRepository: Repository<History>,
                @InjectModel(ArchivedArticle.name) private archivedArticleModel: Model<ArchivedArticle>) {
    }

    async update(updateArticleDto: UpdateArticleDto, userId: number, articleId: string, reason: ActionTypes.Updating | ActionTypes.Restoring) {
        let currentArticleToBeUpdated = await this.articleModel.findById(articleId);
        let archivedArticle = new this.archivedArticleModel({
            title: currentArticleToBeUpdated.title,
            body: currentArticleToBeUpdated.body,
            birth: currentArticleToBeUpdated.birth,
            death: currentArticleToBeUpdated.death
        });
        let lastHistoryRecord = (await this.historyRepository.findBy({
            articleId: articleId
        })).find(el => el.nextArticleId == null);
        lastHistoryRecord.nextArticleId = archivedArticle._id.toString();
        await this.historyRepository.save(lastHistoryRecord);
        await this.historyRepository.save({
            previousArticleId: archivedArticle._id.toString(),
            articleId: articleId,
            actionType: reason,
            userId: userId
        })
        return this.articleModel.findByIdAndUpdate(currentArticleToBeUpdated._id, updateArticleDto, {
            new: true
        });
    }
}
