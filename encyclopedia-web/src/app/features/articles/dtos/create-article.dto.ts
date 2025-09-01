import {Article} from '../models/article';

export type CreateArticleDto = Omit<Article, '_id' | 'createdAt' | 'updatedAt'>
