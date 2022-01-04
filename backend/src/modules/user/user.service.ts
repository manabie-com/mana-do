import { User } from './user.constants';
import userRepo from './user.repository';

class UserService {
  async getUsers(): Promise<User[]> {
    return userRepo.getUsers();
  }
}

export default new UserService;
