import { Controller, Get, Inject } from "@nestjs/common";
import { ContentService } from "./content.service";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
  } from '@nestjs/swagger';
import { ApplicationLoggerService } from "src/logger/logger.service";

@ApiBearerAuth()
@ApiTags('content')
@Controller('content')
export class ContentController{

    constructor(private appLogger: ApplicationLoggerService){
        this.appLogger.setContext('ContenService')
    }
    
    @Inject()
    private contentService: ContentService



    @Get('/fetch')
    @ApiOperation({ summary: 'Fetch contents like tutorials/articles' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 200, description: 'Content fetched.' })
    getAllContent(): string{
        return this.contentService.getAllContent()
    }
}