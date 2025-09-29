import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {HistoryService} from '../../services/history.service';
import {Observable, map} from 'rxjs';
import {History} from '../../models/history';
import {AsyncPipe, DatePipe} from '@angular/common';
import {SideBySideDiffComponent, UnifiedDiffComponent} from 'ngx-diff';
import { HistoryTypeBadgeComponent } from "../history-type-badge/history-type-badge.component";
import { MatIcon } from '@angular/material/icon';
import { HistoryDiffComponent } from "../history-diff/history-diff.component";
import {ArticlePropertiesHistoryComponent} from '../article-properties-history/article-properties-history.component';
import {MatTooltipModule} from '@angular/material/tooltip';



@Component({
  selector: 'app-single-history-page',
  imports: [AsyncPipe, UnifiedDiffComponent, SideBySideDiffComponent, RouterLink, HistoryTypeBadgeComponent, DatePipe, MatIcon, HistoryDiffComponent, ArticlePropertiesHistoryComponent, MatTooltipModule],
  templateUrl: './single-history-page.component.html',
  styleUrl: './single-history-page.component.scss'
})
export class SingleHistoryPageComponent implements OnInit {

    currentHistory$ = new Observable<History|null>;

    constructor(private readonly route: ActivatedRoute,
                protected readonly historyService: HistoryService) {
        this.currentHistory$ = this.historyService.currentHistory;
    }

    ngOnInit(): void {
        this.route.data
            .pipe(map(data => data['history'] as History))
            .subscribe(history => {
                this.historyService.setCurrentHistory(history);
            })
    }

    protected htmlToText(html: string): string {
        return html
            .replace(/></g, '>\n<')  // Add line breaks between tags
            .replace(/(<\/[^>]+>)/g, '$1\n')  // Add line breaks after closing tags
            .split('\n')
            .filter(line => line.trim())  // Remove empty lines
            .join('\n');
    }

}
