import {User} from '../../users/models/user';
import {ActionType} from '../constants/action-type';
import {Article} from '../../articles/models/article';

export class History {

    constructor(id: number, articleId: string, actionDate: Date, actionType: ActionType, previousArticleId: string, nextArticleId: string, user: User, previousArticle: Article, nextArticle: Article, article: Article) {
        this.id = id;
        this.articleId = articleId;
        this.actionDate = actionDate;
        this.actionType = actionType;
        this.previousArticleId = previousArticleId;
        this.nextArticleId = nextArticleId;
        this.user = user;
        this.previousArticle = previousArticle;
        this.nextArticle = nextArticle;
        this.article = article;
    }

    id: number;
    articleId: string;
    actionDate: Date;
    actionType: ActionType;
    previousArticleId: string;
    nextArticleId: string;
    user: User;
    previousArticle: Article;
    nextArticle: Article;
    article: Article;
}
