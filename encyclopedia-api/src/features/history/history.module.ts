import { Module } from '@nestjs/common';
import { HistoryController } from './controllers/history.controller';
import { HistoryService } from './services/history.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {History} from "./entities/history";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([History]),
  UsersModule],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService]
})
export class HistoryModule {}
