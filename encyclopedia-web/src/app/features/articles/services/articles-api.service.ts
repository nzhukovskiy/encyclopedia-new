import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from '../models/article';
import {PaginationResult} from '../../../core/models/pagination-result';
import {CreateArticleDto} from '../dtos/create-article.dto';

@Injectable({
    providedIn: 'root'
})
export class ArticlesApiService {

    constructor(private readonly httpClient: HttpClient) {
    }

    getAll() {
        return this.httpClient.get<PaginationResult<Article>>(`articles`);
    }

    create(createArticleDto: CreateArticleDto) {
        return this.httpClient.post<Article>(`articles/new`, createArticleDto);
    }

    getOne(id: string) {
        return this.httpClient.get<Article>(`articles/${id}`);
    }
}
