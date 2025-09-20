import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Request,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {ArticlesService} from "../services/articles.service";
import {HistoryService} from "../../history/services/history.service";
import {UpdateArticleDto} from "../dtos/update-article.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {
    CollectionDto,
    ValidationPipe,
} from '@forlagshuset/nestjs-mongoose-paginate';
import {ArticlePaginationProperties} from "../pagination/article-pagination-properties";
import {CreateDraftDto} from "../dtos/create-draft-dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileStorage} from "../storage/file-storage";
import {imageFileFilter} from "../storage/image-file-filter";
import {Paginate, PaginateQuery} from "nestjs-paginate";

@ApiTags('articles')
@ApiBearerAuth()
@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService,
                private readonly historyService: HistoryService) {
    }
    @Get()
    getAll(@Query(new ValidationPipe(ArticlePaginationProperties))
               collectionDto: CollectionDto,) {
        return this.articlesService.getAll(collectionDto);
    }

    @Get('draft')
    getDraft(@Request() request) {
        return this.articlesService.getDraft(request.user.id);
    }

    @Post('draft')
    saveDraft(@Request() request, @Body() createDraftDto: CreateDraftDto) {
        return this.articlesService.saveDraft(createDraftDto, request.user.id);
    }

    @Post('publish')
    publishDraft(@Request() request, @Param('id') id: string) {
        return this.articlesService.publishDraft(request.user.id);
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.articlesService.get(id);
    }

    @Get(':id/history')
    getForArticle(@Param('id') id: string, @Paginate() query: PaginateQuery) {
        return this.historyService.getForArticle(id, query);
    }

    @Put(':id')
    update(@Request() request, @Body() updateArticleDto: UpdateArticleDto, @Param('id') id: string) {
        return this.articlesService.update(updateArticleDto, request.user.id, id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.articlesService.delete(id);
    }

    @Post(':id/main-image')
    @UseInterceptors(
        FileInterceptor("mainImage", {
            storage: fileStorage(),
            fileFilter: imageFileFilter,
        })
    )
    uploadMainImage(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
        if (!file) {
            throw new BadRequestException("No file provided");
        }
        return this.articlesService.uploadMainImage(id, file.filename);
    }
}
