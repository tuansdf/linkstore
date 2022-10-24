import { IsArray, IsString, IsUrl } from 'class-validator';

import { ICreateBookmarkDto } from 'types';

import { CreateTagDto } from 'src/domains/tag/dto/create-tag.dto';

export class CreateBookmarkDto implements ICreateBookmarkDto {
  @IsString()
  readonly name: string;

  @IsUrl()
  readonly href: string;

  @IsArray()
  readonly tags: CreateTagDto[];
}
