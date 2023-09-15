import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {History} from "../entities/history";
import {HistoryCreateDto} from "../dtos/history-create.dto";
import {ArchivedArticlesService} from "../../archived-articles/services/archived-articles.service";
import {UsersService} from "../../users/services/users.service";
import {Article} from "../../articles/schemas/article";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class HistoryService {
    constructor(@InjectRepository(History) private readonly historyRepository: Repository<History>,
                @InjectModel(Article.name) private articleModel: Model<Article>,
                private readonly archivedArticlesService: ArchivedArticlesService,
                private readonly usersService: UsersService) {
    }

    async getForUser(userId: number) {
        return this.historyRepository.findBy({
            userId: userId
        })
    }

    async getForArticle(articleId: string) {
        return Promise.all((await this.historyRepository.findBy({
            articleId: articleId
        }))
            .map(async ({
                            previousArticleId,
                            nextArticleId,
                            articleId,
                            ...el
                        }) =>
            {
                let userId = el.userId;
                delete el.userId;
                return {
                    ...el,
                    user: await this.usersService.getById(userId)
                };
            }))
    }

    create(historyCreateDto: HistoryCreateDto) {
        return this.historyRepository.save(historyCreateDto);
        /*return this.historyRepository.save({
            articleId: historyCreateDto.articleId,
            userId: historyCreateDto.userId,
            actionType: historyCreateDto.actionType,
            previousArticleId: historyCreateDto.previousArticleId,
            nextArticleId: historyCreateDto.articleId
        })*/
    }

    update(history: History) {
        return this.historyRepository.save(history);
    }

    async get(historyId: number) {
        let history = await this.historyRepository.findOneBy({
            id: historyId
        })
        let {previousArticleId,
            nextArticleId,
            articleId,
            userId,
            ...projectedHistory}
            = history;
        return {
            ...projectedHistory,
            previousArticle: await this.archivedArticlesService.getById(history.previousArticleId),
            nextArticle: await this.archivedArticlesService.getById(history.nextArticleId),
            article: await this.articleModel.findById(history.articleId),
            user: await this.usersService.getById(history.userId)
        };
    }
}
