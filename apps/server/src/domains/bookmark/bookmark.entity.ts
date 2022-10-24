import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { IBookmark } from 'types';

import { Tag } from 'src/domains/tag/tag.entity';
import { User } from 'src/domains/user/user.entity';
import { CommonEntity } from 'src/shared/common.entity';

@Entity()
export class Bookmark extends CommonEntity implements IBookmark {
  @Column()
  name: string;

  @Column()
  href: string;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
