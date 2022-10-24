import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/domains/auth/auth.module';
import { BookmarkController } from 'src/domains/bookmark/bookmark.controller';
import { Bookmark } from 'src/domains/bookmark/bookmark.entity';
import { BookmarkService } from 'src/domains/bookmark/bookmark.service';
import { TagModule } from 'src/domains/tag/tag.module';
import { UserModule } from 'src/domains/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bookmark]),
    AuthModule,
    UserModule,
    TagModule,
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
