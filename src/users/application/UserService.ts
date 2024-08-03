import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { MySQLUserRepository } from '../infraestructure/MySQLUserRepository';

const userRepository: UserRepository = new MySQLUserRepository();

export const registerUser = (user: User, callback: (error: any, results: any) => void): void => {
  userRepository.createUser(user, callback);
};

export const loginUser = (username: string, callback: (error: any, results: User[]) => void): void => {
  userRepository.findUserByUsername(username, callback);
};
