import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {History} from '../models/history';

@Injectable({
    providedIn: 'root'
})
export class HistoryApiService {

    constructor(private readonly httpClient: HttpClient) {
    }

    getForArticle(articleId: string) {
        return this.httpClient.get<History[]>(`articles/${articleId}/history`);
    }
}
