import { IsString } from 'class-validator';

import { ICreateTagDto } from 'types';

export class CreateTagDto implements ICreateTagDto {
  @IsString()
  name: string;
}
