import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {ArticlesApiService} from "../services/articles-api.service";
import {Article} from "../models/article";

export const articleResolver: ResolveFn<Article> = (route, state) => {
    const articlesApiService = inject(ArticlesApiService);
    const id = route.paramMap.get("id");
    return articlesApiService.getOne(id!);
};
