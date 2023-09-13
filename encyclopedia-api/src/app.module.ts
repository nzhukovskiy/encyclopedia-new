import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { UsersModule } from './features/users/users.module';
import {User} from "./features/users/entities/user";
import { AuthModule } from './features/auth/auth.module';
import { TokenService } from './features/token/token/token.service';
import {MongooseModule} from "@nestjs/mongoose";
import { ArticlesModule } from './features/articles/articles.module';
import { HistoryModule } from './features/history/history.module';
import {History} from "./features/history/entities/history";
import { ArchivedArticlesModule } from './features/archived-articles/archived-articles.module';
import { TokenModule } from './features/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: __dirname + '/../../.env',
    }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          url: configService.get("POSTGRES_URL"),
          entities: [User, History],
          synchronize: true,
        }),
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get("MONGO_URL"),
        }),
      }),
    UsersModule,
    AuthModule,
    ArticlesModule,
    HistoryModule,
    ArchivedArticlesModule,
    TokenModule
  ],
  controllers: [AppController],
  providers: [AppService, TokenService],
})
export class AppModule {}

