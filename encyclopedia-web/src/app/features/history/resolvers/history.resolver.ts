import { ResolveFn } from '@angular/router';
import {History} from '../models/history';
import {inject} from '@angular/core';
import {HistoryApiService} from '../services/history-api.service';

export const historyResolver: ResolveFn<History> = (route, state) => {
    const historyApiService = inject(HistoryApiService);
    const id = route.paramMap.get("id");
    return historyApiService.getSingleHistory(parseInt(id!));
};
