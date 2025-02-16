import { Injectable } from '@nestjs/common';
import { User } from './dto';

// Constants but can be stored in Database also
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'anup',
      password: '3456',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'pswd',
    },
  ];

  findOne(username: string, password: string): User | undefined {
    return this.users.find(
      (user) => user.username === username && password == user.password,
    );
  }
}
