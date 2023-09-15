import {Controller, Param, Post, Request} from '@nestjs/common';
import {ArchivedArticlesService} from "../services/archived-articles.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('archived-articles')
@ApiBearerAuth()
@Controller('archived-articles')
export class ArchivedArticlesController {
    constructor(private readonly archivedArticlesService: ArchivedArticlesService) {
    }
    @Post('restore/:id')
    restore(@Request() request, @Param('id') id: string) {
        return this.archivedArticlesService.restore(id, request.user.id);
    }
}
