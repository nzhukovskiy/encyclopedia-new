import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user";
import {ConfigModule} from "@nestjs/config";
import {TokenModule} from "../token/token.module";
import { UsersController } from './controllers/users.controller';
import {History} from "../history/entities/history";

@Module({
  imports: [TypeOrmModule.forFeature([User, History]),
    ConfigModule,
  TokenModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
