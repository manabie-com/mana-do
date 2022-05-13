import { ChangeEvent, MouseEvent } from 'react';
import { Todo } from '../models/todo';
import TodoItem from './TodoItem';
import { ALL, EnhanceTodoStatus } from '../views/ToDoPage';
import { StyledTodoList } from './TodoList.style';

type TodoListProps = {
  todos: Array<Todo>;
  filter: EnhanceTodoStatus;
  deleteTodo: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
  updateTodoStatus: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  editTodo: (id: string, content: string) => void;
};

const TodoList = ({
  todos = [],
  filter = ALL,
  deleteTodo,
  updateTodoStatus,
  editTodo,
}: TodoListProps) => {
  const todoList =
    filter === ALL ? todos : todos.filter(todo => todo.status === filter);

  return (
    <StyledTodoList>
      {todoList.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodoStatus={updateTodoStatus}
            editTodo={editTodo}
          />
        );
      })}
    </StyledTodoList>
  );
};

export default TodoList;
