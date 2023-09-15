import {ActionTypes} from "../constants/action-types";

export class HistoryCreateDto {
    userId: number;

    articleId: string;

    actionType: ActionTypes;

    previousArticleId?: string;

    nextArticleId?: string
}