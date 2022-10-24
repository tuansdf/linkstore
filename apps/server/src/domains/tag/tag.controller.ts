import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/domains/auth/passport/jwt-auth.guard';
import { CreateTagDto } from 'src/domains/tag/dto/create-tag.dto';
import { UpdateTagDto } from 'src/domains/tag/dto/update-tag.dto';
import { TagService } from 'src/domains/tag/tag.service';

@ApiBearerAuth()
@ApiTags('tag')
@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOneByIdOrFail(id);
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto, @Req() req) {
    return this.tagService.create(req.user.id, createTagDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
