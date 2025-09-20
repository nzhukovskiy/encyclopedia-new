import {ActionType} from "../constants/action-type";

export class HistoryCreateDto {
    userId: number;

    articleId: string;

    actionType: ActionType;

    previousArticleId?: string;

    nextArticleId?: string
}