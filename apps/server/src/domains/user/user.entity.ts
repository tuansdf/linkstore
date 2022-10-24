import { Column, Entity, OneToMany } from 'typeorm';

import { IUser } from 'types';

import { Bookmark } from 'src/domains/bookmark/bookmark.entity';
import { Tag } from 'src/domains/tag/tag.entity';
import { CommonEntity } from 'src/shared/common.entity';

@Entity()
export class User extends CommonEntity implements IUser {
  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];
}
