import { Controller, Get, Inject } from "@nestjs/common";
import { ContentService } from "src/services";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
  } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('content')
@Controller('content')
export class ContentController{

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