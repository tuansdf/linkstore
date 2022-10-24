import { PartialType } from '@nestjs/swagger';

import { IUpdateBookmarkDto } from 'types';

import { CreateBookmarkDto } from 'src/domains/bookmark/dto/create-bookmark.dto';

export class UpdateBookmarkDto
  extends PartialType(CreateBookmarkDto)
  implements IUpdateBookmarkDto {}
