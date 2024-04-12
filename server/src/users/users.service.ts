import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: {
    userId: number;
    username: string;
    password: string;
  }[] = [
    {
      userId: 1,
      username: 'john',
      password: 'john123',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'maria123',
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
