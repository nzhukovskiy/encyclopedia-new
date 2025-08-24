import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {AuthService} from './services/auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthGuard} from "./guards/auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {TokenModule} from "../token/token.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user";

@Module({
    imports: [UsersModule,
        TokenModule,
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET')
            }),
        })],
    controllers: [AuthController],
    providers: [AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        }],
    exports: []
})
export class AuthModule {
}
