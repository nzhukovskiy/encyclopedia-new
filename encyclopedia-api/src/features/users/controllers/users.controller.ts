import {Body, Controller, Get, Post} from '@nestjs/common';
import {UsersService} from "../services/users.service";
import {UserCreateDto} from "../dtos/user-create-dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }
    @Get('all')
    getAll() {
        return this.usersService.getAll();
    }

    @Post('create')
    createUser(@Body() userCreateDto: UserCreateDto) {
        console.log(userCreateDto);
        return this.usersService.create(userCreateDto);
    }
}
