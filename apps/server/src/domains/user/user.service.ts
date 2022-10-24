import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RegisterUserDto } from 'src/domains/auth/dto/register-user.dto';
import { User } from 'src/domains/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.createQueryBuilder().getMany();
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .where('username = :username', { username })
      .getOne();
  }

  async findOneById(userId: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .where('id = :userId', { userId })
      .getOne();
  }

  async findOneByIdOrFail(userId: string): Promise<User> {
    const user = await this.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const user = new User();

    user.username = registerUserDto.username;
    user.password = registerUserDto.password;

    const saved = await this.userRepository.save(user);

    return saved;
  }

  async remove(userId: string) {
    return `This action removes a #${userId} user`;
  }
}
