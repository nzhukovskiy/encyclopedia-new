import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {
    }

    async generateToken(payload: any) {
        return {
            access_token: await this.jwtService.signAsync(payload, {expiresIn: '10d'}),
        };
    }
}
