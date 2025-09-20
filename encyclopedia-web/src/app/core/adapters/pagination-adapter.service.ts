import { Injectable } from '@angular/core';
import {PaginationResult} from '../models/pagination-result';

@Injectable({
  providedIn: 'root'
})
export class PaginationAdapterService {
    adaptMongooseResponse<T>(response: any): PaginationResult<T> {
        return {
            data: response.data,
            pagination: {
                total: response.pagination.total,
                page: response.pagination.page,
                limit: response.pagination.limit,
            }
        };
    }

    adaptTypeOrmResponse<T>(response: any): PaginationResult<T> {
        return {
            data: response.data,
            pagination: {
                total: response.meta.totalItems,
                page: response.meta.currentPage - 1,
                limit: response.meta.itemsPerPage,
            }
        };
    }
}
