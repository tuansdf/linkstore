import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from 'src/domains/auth/auth.controller';
import { AuthService } from 'src/domains/auth/auth.service';
import { JwtStrategy } from 'src/domains/auth/passport/jwt.strategy';
import { LocalStrategy } from 'src/domains/auth/passport/local.strategy';
import { UserModule } from 'src/domains/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60d' },
    }),
  ],
})
export class AuthModule {}
