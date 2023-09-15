import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "../entities/user";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "../dtos/create-user.dto";
import * as bcrypt from 'bcrypt';
import {TokenService} from "../../token/token/token.service";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
                private readonly tokenService: TokenService) {
    }

    async getLeaderboard() {
        return (await this.usersRepository.find({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                registeredAt: true
            },
            relations: {
                histories: true
            }
        })).map(({...el}) => {
            let historiesNumber = el.histories.length;
            delete el.histories;
            return {...el, historiesNumber: historiesNumber};
        }).sort((a, b) => {
            return b.historiesNumber - a.historiesNumber;
        })
    }

    async create(userCreateDto: CreateUserDto) {
        userCreateDto.password = await bcrypt.hash(userCreateDto.password, 10);
        let user = await this.usersRepository.save(userCreateDto);
        return this.tokenService.generateToken(
            {id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email}
        );
    }
}
