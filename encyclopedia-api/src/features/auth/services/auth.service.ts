import {Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginUserDto} from "../dtos/login-user.dto";
import {UsersService} from "../../users/services/users.service";
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "../../users/dtos/create-user.dto";
import {TokenService} from "../../token/token/token.service";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../users/entities/user";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                private readonly tokenService: TokenService,
                @InjectRepository(User) private readonly usersRepository: Repository<User>) {
    }
    async login(loginUserDto: LoginUserDto) {
        let user= await this.usersRepository.findOne({
            where: {
                email: loginUserDto.email
            },
            select: ['password', "id", "email", "firstName", "lastName", "registeredAt"]
        });
        if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
            throw new UnauthorizedException();
        }
        delete user.password
        return this.tokenService.generateToken(JSON.parse(JSON.stringify(user)));
    }

    register(createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
