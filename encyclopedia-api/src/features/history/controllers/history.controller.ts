import {Controller, Get, Param, Request} from '@nestjs/common';
import {HistoryService} from "../services/history.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('history')
@ApiBearerAuth()
@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {
    }
    @Get()
    getForUser(@Request() request) {
        return this.historyService.getForUser(request.user.id);
    }

    @Get(':id')
    get(@Param('id') id: number) {
        return this.historyService.get(id);
    }
}
