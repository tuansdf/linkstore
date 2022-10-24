import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bookmark } from 'src/domains/bookmark/bookmark.entity';
import { CreateBookmarkDto } from 'src/domains/bookmark/dto/create-bookmark.dto';
import { UpdateBookmarkDto } from 'src/domains/bookmark/dto/update-bookmark.dto';
import { TagService } from 'src/domains/tag/tag.service';
import { UserService } from 'src/domains/user/user.service';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    private readonly userService: UserService,
    private readonly tagService: TagService,
  ) {}

  async findAll(userId: string): Promise<Bookmark[]> {
    return this.bookmarkRepository
      .createQueryBuilder('bookmark')
      .leftJoinAndSelect('bookmark.tags', 'tags')
      .leftJoinAndSelect('bookmark.user', 'user')
      .where('bookmark.user = :userId', { userId })
      .getMany();
  }

  async findOneById(bookmarkId: string): Promise<Bookmark> {
    return this.bookmarkRepository
      .createQueryBuilder('bookmark')
      .leftJoinAndSelect('bookmark.tags', 'tags')
      .leftJoinAndSelect('bookmark.user', 'user')
      .where('bookmark.id = :bookmarkId', { bookmarkId })
      .getOne();
  }

  async findOneByIdOrFail(bookmarkId: string): Promise<Bookmark> {
    const bookmark = await this.findOneById(bookmarkId);
    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }
    return bookmark;
  }

  async create(
    userId: string,
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    const bookmark = new Bookmark();

    const user = await this.userService.findOneByIdOrFail(userId);

    const tags = await Promise.all(
      createBookmarkDto.tags.map((tag) => this.tagService.create(user, tag)),
    );

    bookmark.name = createBookmarkDto.name;
    bookmark.href = createBookmarkDto.href;
    bookmark.user = user;
    bookmark.tags = tags;

    const saved = await this.bookmarkRepository.save(bookmark);
    return saved;
  }

  async update(
    bookmarkId: string,
    updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<Bookmark> {
    // find the bookmark by id
    const bookmark = await this.findOneByIdOrFail(bookmarkId);

    // check and assign properties
    if (updateBookmarkDto.name) {
      bookmark.name = updateBookmarkDto.name;
    }
    if (updateBookmarkDto.href) {
      bookmark.href = updateBookmarkDto.href;
    }

    // save the modified bookmark back to the database
    const updated = await this.bookmarkRepository.save(bookmark);

    return updated;
  }

  remove(bookmarkId: string) {
    return `This action removes a #${bookmarkId} bookmark`;
  }
}
