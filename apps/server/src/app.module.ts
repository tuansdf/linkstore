import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from 'src/app.service';
import { AuthModule } from 'src/domains/auth/auth.module';
import { BookmarkModule } from 'src/domains/bookmark/bookmark.module';
import { TagModule } from 'src/domains/tag/tag.module';
import { UserModule } from 'src/domains/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'linkstore.db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    BookmarkModule,
    UserModule,
    AuthModule,
    TagModule,
  ],
  providers: [AppService],
})
export class AppModule {}
