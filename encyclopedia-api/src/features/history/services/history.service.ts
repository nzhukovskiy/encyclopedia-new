import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {History} from "../entities/history";
import {ActionTypes} from "../constants/action-types";

@Injectable()
export class HistoryService {
    constructor(@InjectRepository(History) private readonly historyRepository: Repository<History>) {
    }

    getForUser(userId: number) {
        return this.historyRepository.findBy({
            userId: userId
        })
    }

    getForArticle(articleId: string) {
        return this.historyRepository.findBy({
            articleId: articleId
        })
    }

    create(userId: number, articleId: string) {
        return this.historyRepository.save({
            articleId: articleId,
            userId: userId,
            actionType: ActionTypes.Creation,
            nextArticleId: articleId
        })
    }
}
