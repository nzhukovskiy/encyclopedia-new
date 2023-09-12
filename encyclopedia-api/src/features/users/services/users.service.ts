import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "../entities/user";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "../dtos/create-user-dto";
import * as bcrypt from 'bcrypt';
import {TokenService} from "../../auth/token/token.service";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
                private readonly tokenService: TokenService) {
    }

    getAll() {
        return this.usersRepository.find();
    }

    getByEmail(email: string) {
        return this.usersRepository.findOneBy({
            email: email
        });
    }

    getById(id: number) {
        return this.usersRepository.findOneBy({
            id: id
        });
    }

    async create(userCreateDto: CreateUserDto) {
        userCreateDto.password = await bcrypt.hash(userCreateDto.password, 10);
        let user = await this.usersRepository.save(userCreateDto);
        return this.tokenService.generateToken(
            {id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email}
        );
    }
}
