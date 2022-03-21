import Button from "components/button";
import Input from "components/input";
import React, { useEffect } from "react";
import useFilterTodoFacade from "../facades/useFilterTodoFacade";
import useTodoFacade from "../facades/useTodoFacade";
import { TodoStatus, ToggleAllTodosDto } from "../todo.models";
import Styles from "./todo-toolbar.module.scss";

const TodoToolbar = () => {
  const { todos, toggleAllTodos, deleteAllTodos } = useTodoFacade();
  const { showStatus, setShowStatus } = useFilterTodoFacade();

  const [isAllCompleted, setIsAllCompleted] = React.useState(false);

  useEffect(() => {
    setIsAllCompleted(todos?.every((todo) => todo.status === TodoStatus.COMPLETED));
  }, [todos]);

  const onToggleAllTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const toggleAllTodosDto: ToggleAllTodosDto = {
      status: event.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
    };

    toggleAllTodos(toggleAllTodosDto);
  };

  const onShowAllTodo = () => {
    setShowStatus(TodoStatus.ALL);
  };

  const onShowActiveTodo = () => {
    setShowStatus(TodoStatus.ACTIVE);
  };

  const onShowCompletedTodo = () => {
    setShowStatus(TodoStatus.COMPLETED);
  };

  const onDeleteAllTodo = () => {
    deleteAllTodos();
  };

  const renderToggleAllTodo = () => {
    const hasFilteredTodos = todos.filter((todo) => todo.status === showStatus).length > 0;
    const hasAllTodos = showStatus === TodoStatus.ALL && todos.length > 0;

    if (hasFilteredTodos || hasAllTodos) {
      return (
        <Input
          testId="toggle-all-checkbox"
          type="checkbox"
          checked={isAllCompleted}
          variant="secondary"
          onChange={onToggleAllTodo}
        />
      );
    }

    return <div />;
  };

  return (
    <div className={Styles.Container}>
      {renderToggleAllTodo()}

      <div className={Styles.Tabs}>
        <Button testId="todo-toolbar-select-all" onClick={onShowAllTodo} active={showStatus === TodoStatus.ALL}>
          All
        </Button>
        <Button
          testId="todo-toolbar-select-active"
          onClick={onShowActiveTodo}
          active={showStatus === TodoStatus.ACTIVE}
        >
          Active
        </Button>
        <Button
          testId="todo-toolbar-select-completed"
          variant="success"
          onClick={onShowCompletedTodo}
          active={showStatus === TodoStatus.COMPLETED}
        >
          Completed
        </Button>
      </div>
      <Button testId="todo-toolbar-delete-all" variant="danger" onClick={onDeleteAllTodo}>
        Delete All
      </Button>
    </div>
  );
};

export default TodoToolbar;
