import userRepo from '../user/user.repository';
import { Task, TaskStatus } from './task.constants';
import { CreateTaskDTO } from './task.dto';
import taskRepo from './task.repository';

class TaskService {
  async getTasks(filter?: object): Promise<Task[]> {
    return taskRepo.getTasks(filter);
  }

  async createTask(task: CreateTaskDTO): Promise<Task> {
    const { userId } = task

    if (!userId) {
      throw new Error('The user id is not provided.')
    }

    const user = await userRepo.getUserById(userId);

    if (!user) {
      throw new Error(`Not found user [id=${userId}]`);
    }

    return taskRepo.createTask({
      ...task,
      status: TaskStatus.ACTIVE,
      createdDate: new Date().toISOString(),
    });
  }

  async updateTask({ id, status }: { id: string; status: TaskStatus }): Promise<Task> {
    const task = await taskRepo.getTaskById(id);

    if (!task) {
      throw new Error(`Not found task [id=${id}]`);
    }

    return taskRepo.updateTask(id, {
      status,
    });
  }

  async deleteTask(id: string): Promise<boolean> {
    const task = await taskRepo.getTaskById(id);

    if (!task) {
      throw new Error(`Not found task [id=${id}]`);
    }

    return taskRepo.deleteTask(id);
  }

  async deleteTasks(filter: object): Promise<boolean> {
    return taskRepo.deleteTasks(filter);
  }
}

export default new TaskService();
