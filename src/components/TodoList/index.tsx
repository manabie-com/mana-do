import { useContext, useEffect, useState } from 'react';
import { TodoContext } from 'App';
import { Todo } from 'models/todo';
import './index.scss';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, filter } = useContext(TodoContext);
  const [todoShow, setTodoShow] = useState<Array<Todo>>([]);

  useEffect(() => {
    setTodoShow(todos.filter((todo: Todo) => !filter || todo.status === filter))
  }, [filter, todos])

  return (
    <div className="todo-list">
      {
        todoShow.map((todo: Todo, index: number) => {
          return (
            <TodoItem key={index} todo={todo} />
          );
        })
      }
    </div>
  )
}