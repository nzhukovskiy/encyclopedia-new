import {Body, Controller, Get, Param, Post, Put, Request} from '@nestjs/common';
import {ArticlesService} from "../services/articles.service";
import {CreateArticleDto} from "../dtos/create-article.dto";
import {HistoryService} from "../../history/services/history.service";
import {UpdateArticleDto} from "../dtos/update-article.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('articles')
@ApiBearerAuth()
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

    @Put(':id')
    update(@Request() request, @Body() updateArticleDto: UpdateArticleDto, @Param('id') id: string) {
        return this.articlesService.update(updateArticleDto, request.user.id, id);
    }
}
