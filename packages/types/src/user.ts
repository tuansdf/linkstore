import { IBookmark } from "./bookmark";
import { ICommonEntity } from "./common";

export interface IUser extends ICommonEntity {
  username: string;
  password: string;
  bookmarks: IBookmark[];
}

export interface ILoginUserDto {
  username: string;
  password: string;
}

export interface IRegisterUserDto {
  username: string;
  password: string;
}
