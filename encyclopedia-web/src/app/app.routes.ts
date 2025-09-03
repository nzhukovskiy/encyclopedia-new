import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';
import {articleResolver} from "./features/articles/resolvers/article.resolver";

export const routes: Routes = [
    {
        path: "auth",
        loadComponent: () => import('./features/auth/pages/auth/auth.component').then(c => c.AuthComponent)
    },
    {
        path: "articles",
        loadComponent: () => import('./features/articles/components/all-articles/all-articles.component').then(c => c.AllArticlesComponent),
        canActivate: [authGuard]
    },
    {
        path: "articles/new",
        loadComponent: () => import('./features/articles/components/article-form/article-form.component').then(c => c.ArticleFormComponent),
        canActivate: [authGuard]
    },
    {
        path: "articles/:id/update",
        loadComponent: () => import('./features/articles/components/article-form/article-form.component').then(c => c.ArticleFormComponent),
        canActivate: [authGuard],
        resolve: {article: articleResolver}
    },
    {
        path: "articles/:id",
        loadComponent: () => import('./features/articles/components/article-page/article-page.component').then(c => c.ArticlePageComponent),
        canActivate: [authGuard],
        resolve: {article: articleResolver}
    },
    {
        path: "",
        loadComponent: () => import('./features/articles/components/all-articles/all-articles.component').then(c => c.AllArticlesComponent),
        canActivate: [authGuard]
    }
];
