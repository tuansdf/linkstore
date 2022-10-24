import { ICommonEntity } from "./common";
import { IUser } from "./user";

export interface ITag extends ICommonEntity {
  name: string;
  user: IUser;
}

export interface IUpdateTagDto {
  name?: string;
}

export interface ICreateTagDto {
  name: string;
}
