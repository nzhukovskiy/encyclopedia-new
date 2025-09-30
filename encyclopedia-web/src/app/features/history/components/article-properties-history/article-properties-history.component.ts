import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Article} from '../../../articles/models/article';
import {HistoryDiffComponent} from '../history-diff/history-diff.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-article-properties-history',
    imports: [HistoryDiffComponent],
    templateUrl: './article-properties-history.component.html',
    styleUrl: './article-properties-history.component.scss'
})
export class ArticlePropertiesHistoryComponent implements AfterViewInit, OnInit {

    constructor(private readonly route: ActivatedRoute) {
    }

    differencesLoaded = false;
    hasDifferences = false;

    ngOnInit(): void {
        this.route.params.subscribe(() => {
            this.differencesLoaded = false;
            this.hasDifferences = false;

            setTimeout(() => {
                this.checkDifferences();
            });
        });
    }

    ngAfterViewInit(): void {
        this.checkDifferences();
    }

    @Input() previousArticle?: Article;
    @Input() nextArticle!: Article;

    @ViewChildren('historyDiff') diffDisplayers!: QueryList<HistoryDiffComponent>;

    checkDifferences() {
        this.differencesLoaded = true;
        this.hasDifferences = this.diffDisplayers?.some(displayer => displayer.shouldShowDiff) ?? false;
    }
}
