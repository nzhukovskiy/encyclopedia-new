import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Article} from '../models/article';
import {PaginationResult} from '../../../core/models/pagination-result';
import {CreateArticleDto} from '../dtos/create-article.dto';
import {UpdateArticleDto} from '../dtos/update-article.dto';
import {ArticleFilterParams} from '../models/article-filter-params';

@Injectable({
    providedIn: 'root'
})
export class ArticlesApiService {

    constructor(private readonly httpClient: HttpClient) {
    }

    getAll(articleFilterParams?: ArticleFilterParams) {
        let params = new HttpParams();
        if (articleFilterParams) {
            const searchQuery = {
                title: {
                    $regex: `.*${articleFilterParams.title}.*`
                }
            }
            params = params.append("filter", JSON.stringify(searchQuery));
            if (articleFilterParams.pagination) {
                params = params.append("page", articleFilterParams.pagination.page);
                params = params.append("limit", articleFilterParams.pagination.limit);
            }
        }
        return this.httpClient.get<PaginationResult<Article>>(`articles`, {params});
    }

    create(createArticleDto: CreateArticleDto) {
        return this.httpClient.post<Article>(`articles/new`, createArticleDto);
    }

    update(id: number, updateArticleDto: UpdateArticleDto) {
        return this.httpClient.put<Article>(`articles/${id}`, updateArticleDto);
    }

    getOne(id: string) {
        return this.httpClient.get<Article>(`articles/${id}`);
    }
}
