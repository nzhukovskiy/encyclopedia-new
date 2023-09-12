import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { UsersModule } from './features/users/users.module';
import {User} from "./features/users/entities/user";
import { AuthModule } from './features/auth/auth.module';
import { TokenService } from './features/auth/token/token.service';
import {MongooseModule} from "@nestjs/mongoose";
import { ArticlesModule } from './features/articles/articles.module';
import { HistoryModule } from './features/history/history.module';
import {History} from "./features/history/entities/history";

@Module({
  imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get("POSTGRES_HOST"),
          port: configService.get("POSTGRES_PORT"),
          username: configService.get("POSTGRES_USER"),
          password: configService.get("POSTGRES_PASSWORD"),
          database: configService.get("POSTGRES_DB"),
          entities: [User, History],
          synchronize: true,
        }),
      }),
      //MongooseModule.forRoot('mongodb://mongodb-user:ptk993t$@127.0.0.1:27017/'),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get("MONGO_URL"),
        }),
      }),
    ConfigModule.forRoot({
      envFilePath: __dirname + '/../../../.env',
    }),
    UsersModule,
    AuthModule,
    ArticlesModule,
    HistoryModule
  ],
  controllers: [AppController],
  providers: [AppService, TokenService],
})
export class AppModule {}

