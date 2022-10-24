import { ICommonEntity } from "./common";
import { ICreateTagDto } from "./tag";
import { IUser } from "./user";

export interface IBookmark extends ICommonEntity {
  name: string;
  href: string;
  user: IUser;
}

export interface ICreateBookmarkDto {
  name: string;
  href: string;
  tags: ICreateTagDto[];
}

export interface IUpdateBookmarkDto {
  name?: string;
  href?: string;
  tags?: IUpdateBookmarkDto[];
}
