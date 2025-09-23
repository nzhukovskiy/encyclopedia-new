import {Component, Input} from '@angular/core';
import {Article} from '../../../articles/models/article';
import { HistoryDiffComponent } from '../history-diff/history-diff.component';

@Component({
  selector: 'app-article-properties-history',
  imports: [HistoryDiffComponent],
  templateUrl: './article-properties-history.component.html',
  styleUrl: './article-properties-history.component.scss'
})
export class ArticlePropertiesHistoryComponent {

    @Input() previousArticle?: Article;
    @Input() nextArticle!: Article;
}
