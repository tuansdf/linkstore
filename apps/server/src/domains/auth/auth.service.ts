import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtResponse } from 'src/domains/auth/dto/jwt-response.dto';
import { LoginUserDto } from 'src/domains/auth/dto/login-user.dto';
import { RegisterUserDto } from 'src/domains/auth/dto/register-user.dto';
import { User } from 'src/domains/user/user.entity';
import { UserService } from 'src/domains/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    // find user
    const user = await this.userService.findOneByUsername(
      loginUserDto.username,
    );

    // check if user existed
    if (!user) {
      throw new UnauthorizedException('Wrong username');
    }

    // check password
    if (user.password !== loginUserDto.password) {
      throw new UnauthorizedException('Wrong password');
    }

    return user;
  }

  login(user: User): JwtResponse {
    const payload = { id: user.id, username: user.username };
    return {
      ...payload,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<JwtResponse> {
    // find user
    const existedUser = await this.userService.findOneByUsername(
      registerUserDto.username,
    );

    // avoid duplicated username
    if (existedUser) {
      throw new UnauthorizedException('Username not available');
    }

    const user = await this.userService.create(registerUserDto);

    return this.login(user);
  }
}
