import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/domains/auth/passport/jwt-auth.guard';
import { Bookmark } from 'src/domains/bookmark/bookmark.entity';
import { BookmarkService } from 'src/domains/bookmark/bookmark.service';
import { CreateBookmarkDto } from 'src/domains/bookmark/dto/create-bookmark.dto';
import { SearchBookmarkDto } from 'src/domains/bookmark/dto/search-bookmark.dto';
import { UpdateBookmarkDto } from 'src/domains/bookmark/dto/update-bookmark.dto';

@ApiBearerAuth()
@ApiTags('bookmark')
@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  findAll(@Req() req) {
    return this.bookmarkService.findAll(req?.user?.id);
  }

  @Get('search')
  search(@Query() queries: SearchBookmarkDto, @Req() req) {
    return this.bookmarkService.search(req?.user.id, queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOneByIdOrFail(id);
  }

  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto, @Req() req) {
    return this.bookmarkService.create(req?.user?.id, createBookmarkDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<Bookmark> {
    return this.bookmarkService.update(id, updateBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(id);
  }
}
