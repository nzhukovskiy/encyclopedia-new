import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthGuard} from "./guards/auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {TokenService} from "./token/token.service";

@Module({
  imports: [forwardRef(() => UsersModule),
    ConfigModule,
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
    },
  TokenService],
  exports: [TokenService]
})
export class AuthModule {}
