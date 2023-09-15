import {Controller, Get} from '@nestjs/common';
import {UsersService} from "../services/users.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }
    @Get('leaderboard')
    get() {
        return this.usersService.getLeaderboard();
    }
}
