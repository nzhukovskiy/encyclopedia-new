import {Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginUserDto} from "../dtos/login-user-dto";
import {UsersService} from "../../users/services/users.service";
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "../../users/dtos/create-user-dto";
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                private readonly tokenService: TokenService) {
    }
    async login(loginUserDto: LoginUserDto) {
        let user= await this.usersService.getByEmail(loginUserDto.email);
        if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
            throw new UnauthorizedException();
        }
        return this.tokenService.generateToken(
            {id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email}
        );
    }

    register(createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
