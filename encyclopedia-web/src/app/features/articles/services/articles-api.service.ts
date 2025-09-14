import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Article} from '../models/article';
import {PaginationResult} from '../../../core/models/pagination-result';
import {CreateArticleDto} from '../dtos/create-article.dto';
import {UpdateArticleDto} from '../dtos/update-article.dto';
import {ArticleFilterParams} from '../models/article-filter-params';
import {SaveDraftDto} from '../dtos/save-draft-dto';

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

    update(id: string, updateArticleDto: UpdateArticleDto) {
        return this.httpClient.put<Article>(`articles/${id}`, updateArticleDto);
    }

    getOne(id: string) {
        return this.httpClient.get<Article>(`articles/${id}`);
    }

    delete(id: string) {
        return this.httpClient.delete(`articles/${id}`);
    }

    getDraft() {
        return this.httpClient.get<Article>(`articles/draft`);
    }

    saveDraft(saveDraftDto: SaveDraftDto) {
        return this.httpClient.post<Article>(`articles/draft`, saveDraftDto);
    }

    publishDraft() {
        return this.httpClient.post<Article>(`articles/publish`, {});
    }

    uploadMainImage(articleId: string, image: File | null | undefined) {
        const formData = new FormData();
        if (image) {
            formData.append('mainImage', image);
        }
        return this.httpClient.post<Article>(`articles/${articleId}/main-image`, formData);
    }
}
