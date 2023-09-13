import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user";
import {ConfigModule} from "@nestjs/config";
import {TokenModule} from "../token/token.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    ConfigModule,
  TokenModule],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
