import {BadRequestException, Controller, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {fileStorage} from "../../../articles/storage/file-storage";
import {imageFileFilter} from "../../../articles/storage/image-file-filter";

@Controller('images')
export class ImagesController {
    @Post('upload')
    @UseInterceptors(
        FileInterceptor("upload", {
            storage: fileStorage(),
            fileFilter: imageFileFilter,
        })
    )
    uploadBodyImage(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
        if (!file) {
            throw new BadRequestException("No file provided");
        }
        return {
            uploaded: 1,
            fileName: file.filename,
            url: `http://localhost:3000/uploads/images/${file.filename}`
        };
    }
}
