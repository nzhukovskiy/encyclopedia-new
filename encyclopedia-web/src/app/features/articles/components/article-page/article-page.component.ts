import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../../models/article';

@Component({
  selector: 'app-article-page',
  imports: [],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss'
})
export class ArticlePageComponent implements OnInit {
    constructor(private readonly route: ActivatedRoute) {
    }

    article?: Article;
    ngOnInit(): void {
        this.route.data.subscribe(({article}) => {
            this.article = article;
        })
    }

}
