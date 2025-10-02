import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';
import {articleResolver} from "./features/articles/resolvers/article.resolver";
import {historyResolver} from './features/history/resolvers/history.resolver';

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
        path: "articles/:id/history",
        loadComponent: () => import('./features/history/components/article-history-page/article-history-page.component').then(c => c.ArticleHistoryPageComponent),
        canActivate: [authGuard]
    },
    {
        path: "articles/:id",
        loadComponent: () => import('./features/articles/components/article-page/article-page.component').then(c => c.ArticlePageComponent),
        canActivate: [authGuard],
        resolve: {article: articleResolver}
    },
    {
        path: "history/:id",
        loadComponent: () => import('./features/history/components/single-history-page/single-history-page.component').then(c => c.SingleHistoryPageComponent),
        canActivate: [authGuard],
        resolve: {history: historyResolver}
    },
    {
        path: "profile",
        loadComponent: () => import('./features/users/components/profile/profile.component').then(c => c.ProfileComponent),
        canActivate: [authGuard],
    },
    {
        path: "",
        loadComponent: () => import('./features/articles/components/all-articles/all-articles.component').then(c => c.AllArticlesComponent),
        canActivate: [authGuard]
    }
];
