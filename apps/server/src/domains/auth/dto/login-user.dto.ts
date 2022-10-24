import { IsString } from 'class-validator';

import { ILoginUserDto } from 'types';

export class LoginUserDto implements ILoginUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
