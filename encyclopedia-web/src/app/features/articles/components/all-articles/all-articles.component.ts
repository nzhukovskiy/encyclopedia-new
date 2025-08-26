import {Component, OnInit} from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import {Observable} from 'rxjs';
import {Article} from '../../models/article';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-all-articles',
  imports: [AsyncPipe],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.scss'
})
export class AllArticlesComponent implements OnInit {

    articles$ = new Observable<Article[]>;
    loading$ = new Observable<boolean>;

    constructor(private readonly articlesService: ArticlesService) {
        this.articles$ = this.articlesService.articles;
        this.loading$ = this.articlesService.loading;
    }

    ngOnInit(): void {
        this.articlesService.loadArticles();

    }

}
