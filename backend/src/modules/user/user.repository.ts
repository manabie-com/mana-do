import BaseRepository from '../../databases/repository';
import { User } from './user.constants';

type Data = {
  users: User[];
};

class UserRepository extends BaseRepository {
  constructor() {
    super('users');
  }

  async getUsers(): Promise<User[]> {
    return this.get<Data>();
  }

  async getUserById(id: string): Promise<User> {
    return this.getOne<Data>(id);
  }
}

export default new UserRepository();
