import {Injectable} from '@angular/core';
import {HistoryApiService} from './history-api.service';
import {BehaviorSubject} from 'rxjs';
import {History} from '../models/history';

@Injectable({
    providedIn: 'root'
})
export class HistoryService {
    constructor(private readonly historyApiService: HistoryApiService) {
    }

    private $history = new BehaviorSubject<History[]>([]);
    history = this.$history.asObservable();


    loadHistory(articleId: string, forceReload = false) {
        if (this.$history.value.length && !forceReload) {
            return;
        }
        this.historyApiService.getForArticle(articleId).subscribe(history => {
            this.$history.next(history);
        })
    }
}
