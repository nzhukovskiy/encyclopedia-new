import { Component, Input } from '@angular/core';
import { Article } from '../../models/article';

@Component({
  selector: 'app-article-card',
  imports: [],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() article?: Article;
}
