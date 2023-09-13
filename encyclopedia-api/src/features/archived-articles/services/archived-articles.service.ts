import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ArchivedArticle} from "../entities/archived-article";
import {Model} from "mongoose";
import {CreateArticleDto} from "../../articles/dtos/create-article-dto";

@Injectable()
export class ArchivedArticlesService {
    constructor(@InjectModel(ArchivedArticle.name) private archivedArticleModel: Model<ArchivedArticle>) {
    }

    async create(createArticleDto: CreateArticleDto) {
        let archivedArticle = new this.archivedArticleModel(createArticleDto);
        return archivedArticle.save();
    }

    getById(id: string) {
        return this.archivedArticleModel.findById(id);
    }
}
