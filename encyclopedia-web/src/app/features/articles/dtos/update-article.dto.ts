import {Article} from '../models/article';

export type UpdateArticleDto = Partial<Omit<Article, '_id' | 'createdAt' | 'updatedAt'>>
