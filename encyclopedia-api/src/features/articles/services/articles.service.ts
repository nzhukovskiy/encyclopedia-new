import {BadRequestException, Injectable, NotFoundException, ValidationError} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Article} from "../schemas/article";
import {Error, FilterQuery, Model} from "mongoose";
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
import {CreateDraftDto} from "../dtos/create-draft-dto";
import {ArticleStatus} from "../constants/article-status";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

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
        const defaultFilter: FilterQuery<Article> = {
            status: ArticleStatus.PUBLISHED,
        };

        const combinedFilter = {
            $and: [
                defaultFilter,
                ...(collectionDto.filter && Object.keys(collectionDto.filter).length > 0
                    ? [collectionDto.filter]
                    : []),
            ],
        };

        const onlyPublishedDto = {
            ...collectionDto,
            filter: combinedFilter,
        };
        return collector.find(onlyPublishedDto);
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

    async getDraft(userId: number) {
        return this.articleModel.findOne({authorId: userId, status: ArticleStatus.DRAFT});
    }

    async saveDraft(createDraftDto: CreateDraftDto, userId: number) {
        return this.articleModel.findOneAndUpdate(
            {authorId: userId, status: ArticleStatus.DRAFT},
            {$set: createDraftDto, $setOnInsert: { author: userId }},
            {upsert: true, new: true});
    }

    async publishDraft(userId: number) {
        let draft = await this.getDraft(userId);
        if (!draft) {
            throw new NotFoundException("No draft for user");
        }
        const articleToValidate = plainToInstance(CreateArticleDto, draft.toObject());
        console.log(articleToValidate)
        const errors = await validate(articleToValidate);
        console.log(errors[0]);
        if (errors.length > 0) {
            // const messages = errors.map(err => Object.values(err.constraints)).flat();
            // throw new BadRequestException(messages);
            const messages = this.extractMessages(errors);
            if (messages.length > 0) {
                throw new BadRequestException(messages);
            }
        }
        draft.status = ArticleStatus.PUBLISHED;
        let user = await this.userRepository.findOneBy({
            id: userId
        })
        let history = new History();
        history.user = user;
        history.articleId = draft.id;
        history.actionType = ActionTypes.Creation;
        await this.historyRepository.save(history);
        return draft.save();
    }

    private extractMessages(errors: ValidationError[]): string[] {
        const msgs: string[] = [];

        for (const error of errors) {
            if (error.constraints) {
                msgs.push(...Object.values(error.constraints));
            }
            if (error.children && error.children.length) {
                msgs.push(...this.extractMessages(error.children));
            }
        }

        return msgs;
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
