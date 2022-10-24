import { Column, Entity, ManyToOne } from 'typeorm';

import { ITag } from 'types';

import { User } from 'src/domains/user/user.entity';
import { CommonEntity } from 'src/shared/common.entity';

@Entity()
export class Tag extends CommonEntity implements ITag {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.tags)
  user: User;
}
