import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "../entities/user";
import {InjectRepository} from "@nestjs/typeorm";
import {UserCreateDto} from "../dtos/user-create-dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {
    }

    getAll() {
        return this.usersRepository.find();
    }

    create(userCreateDto: UserCreateDto) {
        return this.usersRepository.insert(userCreateDto);
    }
}
