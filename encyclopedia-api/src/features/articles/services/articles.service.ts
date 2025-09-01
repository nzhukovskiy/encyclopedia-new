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
import {CollectionDto, DocumentCollector} from "@forlagshuset/nestjs-mongoose-paginate";

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Article.name) private readonly articleModel: Model<Article>,
                @InjectModel(ArchivedArticle.name) private readonly archivedArticleModel: Model<ArchivedArticle>,
                @InjectRepository(History) private readonly historyRepository: Repository<History>,
                @InjectRepository(User) private readonly userRepository: Repository<User>,
                private readonly articleUpdateService: ArticleUpdateService) {
    }
    getAll(collectionDto: CollectionDto) {
        const collector = new DocumentCollector<Article>(this.articleModel);
        return collector.find(collectionDto);
        // return this.articleModel.find();
    }

    async get(articleId: string) {
        let model = await this.articleModel.findOne(
            {
                _id: articleId
            }
        ).lean();
        return {
            ...model,
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
        }
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
