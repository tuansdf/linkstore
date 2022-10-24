import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagController } from 'src/domains/tag/tag.controller';
import { Tag } from 'src/domains/tag/tag.entity';
import { TagService } from 'src/domains/tag/tag.service';
import { UserModule } from 'src/domains/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), UserModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
