import { IsOptional } from 'class-validator';

import { ISearchBookmarkDto } from 'types';

export class SearchBookmarkDto implements ISearchBookmarkDto {
  @IsOptional()
  tag?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  href?: string;
}
