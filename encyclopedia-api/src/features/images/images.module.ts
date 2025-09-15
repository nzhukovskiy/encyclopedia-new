import { Module } from '@nestjs/common';
import {ImagesController} from "./controllers/images/images.controller";

@Module({
    controllers: [ImagesController]
})
export class ImagesModule {}
