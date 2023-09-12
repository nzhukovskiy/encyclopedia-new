import {Controller, Get, Request} from '@nestjs/common';
import {HistoryService} from "../services/history.service";

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {
    }
    @Get()
    getForUser(@Request() request) {
        return this.historyService.getForUser(request.user.id);
    }
}
