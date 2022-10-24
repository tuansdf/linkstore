import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ICommonEntity } from 'types';

import { nanoid } from 'src/config/nanoid.config';

export abstract class CommonEntity implements ICommonEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  generateId() {
    this.id = nanoid();
  }
}
