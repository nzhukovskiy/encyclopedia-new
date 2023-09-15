import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {LoginUserDto} from "../dtos/login-user.dto";
import {AuthService} from "../services/auth.service";
import {Public} from "../decorators/public-route-decorator";
import {CreateUserDto} from "../../users/dtos/create-user.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    @Public()
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }
    @Post('login')
    @Public()
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @Get('test_user')
    testUser(@Request() request) {
        return request.user;
    }
}
