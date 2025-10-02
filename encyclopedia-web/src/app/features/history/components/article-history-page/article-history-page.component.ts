import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoryService} from '../../services/history.service';
import {HistoryFilterParams} from '../../models/history-filter-params';
import {AsyncPipe} from '@angular/common';
import { ArticleHistoryComponent } from '../article-history/article-history.component';

@Component({
  selector: 'app-article-history-page',
  imports: [AsyncPipe, ArticleHistoryComponent],
  templateUrl: './article-history-page.component.html',
  styleUrl: './article-history-page.component.scss'
})
export class ArticleHistoryPageComponent {
    constructor(protected readonly historyService: HistoryService) {
    }

    loadHistory(data: {id: string | null, params: HistoryFilterParams}) {
        this.historyService.loadHistory(
            data.id!,
            data.params,
            true);
    }
}
