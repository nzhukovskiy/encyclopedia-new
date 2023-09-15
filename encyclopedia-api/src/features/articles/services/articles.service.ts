import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Article} from "../schemas/article";
import {Model} from "mongoose";
import {CreateArticleDto} from "../dtos/create-article.dto";
import {UpdateArticleDto} from "../dtos/update-article.dto";
import {ActionTypes} from "../../history/constants/action-types";
import {ArticleUpdateService} from "../../article-update/services/article-update.service";
import {ArchivedArticle} from "../../archived-articles/entities/archived-article";
import {InjectRepository} from "@nestjs/typeorm";
import {History} from "../../history/entities/history";
import {Repository} from "typeorm";
import {User} from "../../users/entities/user";

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Article.name) private readonly articleModel: Model<Article>,
                @InjectModel(ArchivedArticle.name) private readonly archivedArticleModel: Model<ArchivedArticle>,
                @InjectRepository(History) private readonly historyRepository: Repository<History>,
                @InjectRepository(User) private readonly userRepository: Repository<User>,
                private readonly articleUpdateService: ArticleUpdateService) {
    }
    getAll() {
        return this.articleModel.find();
    }

    async get(articleId: string) {
        return this.articleModel.findOne({
            _id: articleId
        }, {
            lastHistory: await this.historyRepository.find({
                where: {
                    articleId: articleId
                },
                order: {
                    actionDate: 'desc'
                },
                take: 1,
                relations: {
                    user: true
                }
            }),
            title: 1,
            body: 1,
            birth: 1,
            death: 1
        });
    }

    async create(createArticleDto: CreateArticleDto, userId: number) {
        let newArticle = new this.articleModel(createArticleDto);
        let user = await this.userRepository.findOneBy({
            id: userId
        })
        let history = new History();
        history.user = user;
        history.articleId = newArticle.id;
        history.actionType = ActionTypes.Creation;
        await this.historyRepository.save(history);
        return newArticle.save();
    }

    async update(updateArticleDto: UpdateArticleDto, userId: number, articleId: string) {
        return this.articleUpdateService.update(updateArticleDto, userId, articleId, ActionTypes.Updating);
    }

    async delete(articleId: string) {
        let histories = await this.historyRepository.findBy({
            articleId: articleId
        })
        for (const el of histories) {
            await this.archivedArticleModel.findByIdAndDelete(el.previousArticleId);
            await this.archivedArticleModel.findByIdAndDelete(el.nextArticleId);
            await this.historyRepository.delete(el.id);
        }
        await this.articleModel.findByIdAndDelete(articleId);
    }
}
