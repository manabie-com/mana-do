import { TodoStatus } from '../constants/todo';

class Todo {
  id: string;
  user_id: string;
  content: string;
  status?: TodoStatus;
  created_date: string;

  constructor(
    id: string,
    user_id: string,
    content: string,
    created_date: string,
    status?: TodoStatus
  ) {
    this.id = id;
    this.user_id = user_id;
    this.created_date = created_date;
    this.status = status;
    this.content = content;
  }

  isTodoCompleted(): boolean {
    return this.status === TodoStatus.COMPLETED;
  }

  isTodoActive(): boolean {
    return this.status === TodoStatus.ACTIVE;
  }

  set Status(value: boolean) {
    this.status = value ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
  }

  set Content(content: string) {
    this.content = content;
  }
}

export default Todo;
