import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Article} from '../../../articles/models/article';
import { HistoryDiffComponent } from '../history-diff/history-diff.component';

@Component({
  selector: 'app-article-properties-history',
  imports: [HistoryDiffComponent],
  templateUrl: './article-properties-history.component.html',
  styleUrl: './article-properties-history.component.scss'
})
export class ArticlePropertiesHistoryComponent implements AfterViewInit {

    differencesLoaded = false;
    hasDifferences: boolean = false;

    ngAfterViewInit(): void {
      this.checkDifferences();
    }

    @Input() previousArticle?: Article;
    @Input() nextArticle!: Article;

    @ViewChildren('historyDiff') diffDisplayers!: QueryList<HistoryDiffComponent>;

    checkDifferences() {
      // console.log(this.diffDisplayers)
      // if (this.diffDisplayers) {
      //   return this.diffDisplayers?.some(displayer => displayer.shouldShowDiff) ?? false;
      // }
      // return false;
      this.differencesLoaded = true;
      this.hasDifferences = this.diffDisplayers?.some(displayer => displayer.shouldShowDiff) ?? false;
    }
}
