import * as React from "react";
import { isTodoCompleted } from "../../../utils";
import todoAction from "../store/todo.action";
import { ITodo, TodoStatus } from "../store/todo.constant";
import { useTodoContext } from "../TodoContext";
import "./styles.scss";

const TodoList = () => {
  const {
    state: { todos, activeTab },
    dispatch,
  } = useTodoContext();

  React.useEffect(() => {
    dispatch(todoAction.fetchTodosRequest());
  }, []);

  const deleteTodo = (id: string) => {
    dispatch(todoAction.deleteTodoRequest(id));
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    dispatch(todoAction.updateTodoRequest(todoId, { status }));
  };

  const showTodos = todos.filter((todo) => {
    switch (activeTab) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  return (
    <div className="Todo__list">
      {
        showTodos.length ? (
          showTodos.map((todo) => {
            return (
              <div key={todo.id} className="Todo__item">
                <div className="Todo__item__section">
                  <input
                    type="checkbox"
                    checked={isTodoCompleted(todo)}
                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                  />
                  <span>{todo.content}</span>
                </div>
    
                <button
                  className="Todo__delete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  X
                </button>
              </div>
            );
          })
        ) : (
          <p className="Todo__list__empty">List is empty</p>
        )
      }
    </div>
  );
};

export default TodoList;
