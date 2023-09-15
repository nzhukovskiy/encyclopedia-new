import {Controller, Get, Param, Request} from '@nestjs/common';
import {HistoryService} from "../services/history.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {History} from "../entities/history";

@ApiTags('history')
@ApiBearerAuth()
@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {
    }
    @Get()
    getForUser(@Request() request): Promise<History[]> {
        return this.historyService.getForUser(request.user.id);
    }

    @Get(':id')
    get(@Param('id') id: number) {
        return this.historyService.get(id);
    }
}
