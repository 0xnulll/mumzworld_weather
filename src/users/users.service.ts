import { Injectable } from '@nestjs/common';
import { User } from './dto';

/**
 * Service for managing users.
 * This service provides methods to interact with user data.
 * Used user as constant here but can be replaced with real users in db, password can be stored as hash
 **/
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

  /**
   * Finds a user by username and password.
   * @param username - The username of the user to find.
   * @param password - The password of the user to validate.
   * @returns The user if found, otherwise undefined.
   */
  findOne(username: string, password: string): User | undefined {
    return this.users.find(
      (user) => user.username === username && password == user.password,
    );
  }
}
