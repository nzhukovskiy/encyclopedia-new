import { Injectable } from '@nestjs/common';
import * as process from "process";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {
  }
  getHello(): string {
    console.log(__dirname);
    return this.configService.get("POSTGRES_PORT");
  }
}
