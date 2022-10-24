import { PartialType } from '@nestjs/swagger';

import { IUpdateTagDto } from 'types';

import { CreateTagDto } from 'src/domains/tag/dto/create-tag.dto';

export class UpdateTagDto
  extends PartialType(CreateTagDto)
  implements IUpdateTagDto {}
