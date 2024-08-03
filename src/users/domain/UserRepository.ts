import { User } from './User';

export interface UserRepository {
  createUser(user: User, callback: (error: any, results: any) => void): void;
  findUserByUsername(username: string, callback: (error: any, results: User[]) => void): void;
}
