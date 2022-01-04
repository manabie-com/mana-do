import BaseRepository from '../../databases/repository';
import { Task } from './task.constants';

type Data = {
  users: object[]
}

class TaskRepository extends BaseRepository {
  constructor() {
    super('tasks');
  }

  async getTasks(filter?: object): Promise<Task[]> {
    return this.get<Data>(filter);
  }

  async getTaskById(id: string): Promise<Task> {
    return this.getOne<Data>(id);
  }

  async createTask(task: Task): Promise<Task> {
    return this.create<Data>(task).then(createdTask => createdTask);
  }

  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    return this.update<Data>(id, task).then(updatedTask => updatedTask);
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.delete<Data>(id);
  }

  async deleteTasks(filter: object): Promise<boolean> {
    return this.deleteAll<Data>(filter);
  }
}

export default new TaskRepository();
