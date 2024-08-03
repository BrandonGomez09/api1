import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import connection from '../../common/database';

export class MySQLUserRepository implements UserRepository {
  createUser(user: User, callback: (error: any, results: any) => void): void {
    connection.query('INSERT INTO users SET ?', user, callback);
  }

  findUserByUsername(username: string, callback: (error: any, results: User[]) => void): void {
    connection.query('SELECT * FROM users WHERE username = ?', [username], callback);
  }
}
