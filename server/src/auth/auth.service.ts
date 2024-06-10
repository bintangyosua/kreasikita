import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user = await this.prisma.user.update({
      where: {
        username,
      },
      data: {
        password,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: temp, ...newUser } = user;
    return newUser;
  }
}
