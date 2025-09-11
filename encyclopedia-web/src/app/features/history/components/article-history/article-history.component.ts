import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HistoryService} from '../../services/history.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-article-history',
    imports: [AsyncPipe],
    templateUrl: './article-history.component.html',
    styleUrl: './article-history.component.scss'
})
export class ArticleHistoryComponent implements OnInit {
    constructor(private readonly route: ActivatedRoute,
                protected readonly historyService: HistoryService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.historyService.loadHistory(params.get('id')!);
        })
    }
}
