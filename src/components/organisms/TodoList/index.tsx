import React, { ChangeEvent, Fragment } from 'react';
import { Input } from 'components/atoms';
import { TodoRow } from 'components/molecules';
import { Todo } from 'models/todo';

type Props = {
  onUpdateTodoStatus: (e: ChangeEvent<HTMLInputElement>, todoId: string) => void;
  onToggleAllTodo: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteTodo: (todoId: string) => void;
  onUpdateTodo: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  activeTodos: number;
  showTodos: Todo[];
  todos: Todo[];
  forwardedRef?: React.RefObject<HTMLInputElement>;
}

const TodoList = ({onUpdateTodoStatus , onToggleAllTodo, onDeleteTodo, onUpdateTodo,
                  showTodos, activeTodos, todos, forwardedRef }:Props) => {

  const renderHeader = (isShow : boolean) =>{
    return isShow && (
      <div className="row">
          <div className="col-2">
            <Input
                type="checkbox"
                checked={activeTodos === 0 && todos.length > 0}
                onChange={onToggleAllTodo} />
          </div>
          <div className="col-10">
            <div className="text-left TodoBox__line-height-center">
              <b>Description</b>
            </div>
          </div>
        </div>
    )
  }

  const renderContent = (todos : Todo[]) => {
    return todos.map((todo) => {
      return (
          <TodoRow
            key={todo.id} 
            onUpdateTodoStatus={onUpdateTodoStatus} 
            onDeleteTodo={onDeleteTodo} 
            onUpdateTodo={onUpdateTodo}
            todo={todo}
            forwardedRef={forwardedRef} />
      );
  })
  }

  return (
    <Fragment>
      {renderHeader(todos.length > 0)}

      {renderContent(showTodos)}
    </Fragment>
  );
};

export default TodoList;