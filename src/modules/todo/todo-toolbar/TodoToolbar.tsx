import * as React from "react";
import { isTodoCompleted } from "../../../utils";
import todoAction from "../store/todo.action";
import { TodoStatus } from "../store/todo.constant";
import { useTodoContext } from "../TodoContext";
import "./styles.scss";

const TodoToolbar = () => {
  const {
    state: { todos, activeTab },
    dispatch,
  } = useTodoContext();

  const onClickAllTab = () => {
    dispatch(todoAction.setActiveTab(TodoStatus.ALL));
  };

  const onClickActiveTab = () => {
    dispatch(todoAction.setActiveTab(TodoStatus.ACTIVE));
  };

  const onClickCompletedTab = () => {
    dispatch(todoAction.setActiveTab(TodoStatus.COMPLETED));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    dispatch(todoAction.updateAllTodosRequest({ status }));
  }

  const onDeleteAllTodos = () => {
    dispatch(todoAction.deleteAllTodos())
  }

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
}, 0);

  return (
    <div className="Todo__toolbar">
      {todos.length > 0 ? (
        <input
          type="checkbox"
          checked={activeTodos === 0}
          onChange={onToggleAllTodo}
        />
      ) : (
        <div />
      )}
      <div className="Todo__tabs">
        <div className="Todo__tab">
          <button className={`Action__btn ${activeTab === TodoStatus.ALL && 'Action__btn--focus'}`} onClick={onClickAllTab}>
            All
          </button>
        </div>
        <div className="Todo__tab">
          <button className={`Action__btn ${activeTab === TodoStatus.ACTIVE && 'Action__btn--focus'}`} onClick={onClickActiveTab}>
            Active
          </button>
        </div>
        <div className="Todo__tab">
          <button className={`Action__btn ${activeTab === TodoStatus.COMPLETED && 'Action__btn--focus'}`} onClick={onClickCompletedTab}>
            Completed
          </button>
        </div>
      </div>
      <div className="Todo__tab">
        <button className="Action__btn" onClick={onDeleteAllTodos}>Clear all todos</button>
      </div>
    </div>
  );
};

export default TodoToolbar;
