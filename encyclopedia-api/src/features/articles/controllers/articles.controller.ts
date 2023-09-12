import {Body, Controller, Get, Param, Post, Request} from '@nestjs/common';
import {ArticlesService} from "../services/articles.service";
import {CreateArticleDto} from "../dtos/create-article-dto";
import {HistoryService} from "../../history/services/history.service";

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService,
                private readonly historyService: HistoryService) {
    }
    @Get()
    getAll() {
        return this.articlesService.getAll();
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.articlesService.get(id);
    }

    @Get(':id/history')
    getForArticle(@Param('id') id: string) {
        return this.historyService.getForArticle(id);
    }

    @Post('new')
    create(@Request() request, @Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto, request.user.id);
    }
}
