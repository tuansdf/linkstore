import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTagDto } from 'src/domains/tag/dto/create-tag.dto';
import { UpdateTagDto } from 'src/domains/tag/dto/update-tag.dto';
import { Tag } from 'src/domains/tag/tag.entity';
import { User } from 'src/domains/user/user.entity';
import { UserService } from 'src/domains/user/user.service';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.createQueryBuilder().getMany();
  }

  async findOneByIdOrFail(tagId: string): Promise<Tag> {
    const tag = await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.user', 'user')
      .where('tag.id = :tagId', { tagId })
      .getOne();

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return tag;
  }

  async create(user: User, createTagDto: CreateTagDto): Promise<Tag> {
    const tag = new Tag();

    console.log({ createTagDto });

    tag.name = createTagDto.name;
    tag.user = user;

    const saved = await this.tagRepository.save(tag);

    return saved;
  }

  async createWithRelationship(
    userId: string,
    createTagDto: CreateTagDto,
  ): Promise<Tag> {
    const user = await this.userService.findOneByIdOrFail(userId);

    const saved = await this.create(user, createTagDto);

    return saved;
  }

  async update(tagId: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOneByIdOrFail(tagId);

    tag.name = updateTagDto.name;

    const updated = await this.tagRepository.save(tag);

    return updated;
  }

  async remove(tagId: string) {
    return this.tagRepository.delete(tagId);
  }
}
