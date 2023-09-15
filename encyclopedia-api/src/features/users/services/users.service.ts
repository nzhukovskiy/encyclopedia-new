import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "../entities/user";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "../dtos/create-user.dto";
import * as bcrypt from 'bcrypt';
import {TokenService} from "../../token/token/token.service";
import {History} from "../../history/entities/history";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
                @InjectRepository(History) private readonly historyRepository: Repository<History>,
                private readonly tokenService: TokenService) {
    }

    getAll() {
        return this.usersRepository.find();
    }

    async getByEmail(email: string) {
        return await this.usersRepository.findOne({
            where: {
                email: email
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                registeredAt: true
            }
        });
    }

    async getById(id: number) {
        return await this.usersRepository.findOne({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                registeredAt: true
            }
        });
    }

    async getLeaderboard() {
        return Promise.all((await this.usersRepository.find({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                registeredAt: true
            }
        })).map(async el => ({
            ...el, score: await this.historyRepository.count({
                where: {
                    userId: el.id
                }
            })
        })));
    }

    async create(userCreateDto: CreateUserDto) {
        userCreateDto.password = await bcrypt.hash(userCreateDto.password, 10);
        let user = await this.usersRepository.save(userCreateDto);
        return this.tokenService.generateToken(
            {id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email}
        );
    }
}
