import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { Response } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../../generated/prisma';
import { ConfigService } from '@nestjs/config';
import { TokenPayloadInterface } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User, response: Response) {
    const expires = new Date();

    expires.setMilliseconds(
      expires.getMilliseconds() +
        ms(
          this.configService.getOrThrow<string>(
            'JWT_EXPIRATION',
          ) as unknown as ms.StringValue,
        ),
    );

    const tokenPayload: TokenPayloadInterface = {
      userID: user.id,
    };
    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      secure: true,
      expires,
    });

    return { tokenPayload };
  }

  async verifyUser(email: string, password: string) {
    let isPassportValid = true;
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        isPassportValid = false;
        throw new UnauthorizedException();
      }
      return user;
    } catch {
      throw new UnauthorizedException(
        isPassportValid
          ? 'Credentials are not valid.'
          : 'Password is incorrect.',
      );
    }
  }
}
