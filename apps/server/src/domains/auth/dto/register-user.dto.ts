import { IsString } from 'class-validator';

import { IRegisterUserDto } from 'types';

export class RegisterUserDto implements IRegisterUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
