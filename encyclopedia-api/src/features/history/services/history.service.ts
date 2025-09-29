import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {History} from "../entities/history";
import {ArchivedArticlesService} from "../../archived-articles/services/archived-articles.service";
import {Article} from "../../articles/schemas/article";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../../users/entities/user";
import {paginate, PaginateQuery} from "nestjs-paginate";

@Injectable()
export class HistoryService {
    constructor(@InjectRepository(History) private readonly historyRepository: Repository<History>,
                @InjectRepository(User) private readonly userRepository: Repository<User>,
                @InjectModel(Article.name) private articleModel: Model<Article>,
                private readonly archivedArticlesService: ArchivedArticlesService) {
    }

    async getForUser(userId: number) {
        return Promise.all((await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                histories:true
            }
        })).histories.map(
            async ({previousArticleId, nextArticleId, ...el}) =>
            {
                let articleId = el.articleId;
                delete el.articleId;
                return {
                    ...el,
                    article: await this.articleModel.findById(articleId)
                };
            })
        );
    }

    async getForArticle(articleId: string, query: PaginateQuery) {
        const queryBuilder = this.historyRepository.createQueryBuilder('history')
            .leftJoinAndSelect('history.user', 'user')
            .where('history.articleId = :articleId', { articleId });
        const result = await paginate(query, queryBuilder, {
            sortableColumns: ['actionDate'],
            defaultSortBy: [['actionDate', 'DESC']],
            relations: ['user'],
        });
        result.data = result.data.map(({ previousArticleId, nextArticleId, articleId, ...el }) => el as History);

        return result;
        // return Promise.all((await this.historyRepository.find({
        //     where: {
        //         articleId: articleId
        //     },
        //     relations: {
        //         user: true
        //     }
        // })).map(({previousArticleId,
        //               nextArticleId,
        //               articleId,
        //               ...el}) => el))
    }

    async get(historyId: number) {
        let history = await this.historyRepository.findOne({
            where: {
                id: historyId
            },
            relations: {
                user: true
            }
        });
        let {previousArticleId,
            nextArticleId,
            articleId,
            ...projectedHistory}
            = history;
        const previousHistory = history.previousArticleId ? await this.historyRepository.findOne({
            where: {
                nextArticleId: history.previousArticleId
            }
        }) : null;
        const nextHistory = history.nextArticleId ? await this.historyRepository.findOne({
            where: {
                previousArticleId: history.nextArticleId
            }
        }) : null;
        return {
            ...projectedHistory,
            previousArticle: await this.archivedArticlesService.getById(history.previousArticleId),
            nextArticle: await this.archivedArticlesService.getById(history.nextArticleId),
            previousHistory: previousHistory,
            nextHistory: nextHistory,
            article: await this.articleModel.findById(history.articleId)
        };
    }
}
