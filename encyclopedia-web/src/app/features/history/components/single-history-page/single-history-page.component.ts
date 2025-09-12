import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HistoryService} from '../../services/history.service';
import {map} from 'rxjs';
import {History} from '../../models/history';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-single-history-page',
  imports: [AsyncPipe],
  templateUrl: './single-history-page.component.html',
  styleUrl: './single-history-page.component.scss'
})
export class SingleHistoryPageComponent implements OnInit {

    constructor(private readonly route: ActivatedRoute,
                protected readonly historyService: HistoryService) {
    }

    ngOnInit(): void {
        this.route.data
            .pipe(map(data => data['history'] as History))
            .subscribe(history => {
                this.historyService.setCurrentHistory(history);
            })
    }
}
