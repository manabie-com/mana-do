import { Button, Checkbox, Col, Popconfirm, Row } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React from "react";
import {
  AppActions,
  deleteAllTodos,
  getActiveTodo,
  getAllTodo,
  getCompletedTodo,
  toggleAllTodos,
} from "../store/actions";
import "./TodoAction.css";

type TodoActionProps = {
  todoLength: number;
  dispatch: (value: AppActions) => void;
  isCompletedAllTask: boolean;
};

const TodoAction: React.FC<TodoActionProps> = ({
  todoLength,
  dispatch,
  isCompletedAllTask,
}) => {
  const getTodoActiveStatus = () => {
    dispatch(getActiveTodo());
  };

  const getTodoCompletedStatus = () => {
    dispatch(getCompletedTodo());
  };

  const getTodoAllStatus = () => {
    dispatch(getAllTodo());
  };

  const onToggleAllTodo = (e: CheckboxChangeEvent) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };
  // Edit Todo
  return (
    <div className="Todo__toolbar">
      <Row align="middle">
        <Col span={2} className="text-left pl-4">
          {todoLength > 0 && (
            <Checkbox checked={isCompletedAllTask} onChange={onToggleAllTodo} />
          )}
        </Col>
        <Col span={16}>
          <div className="Todo__tabs">
            <Button
              shape="round"
              className="Action__btn"
              onClick={getTodoAllStatus}
            >
              All
            </Button>
            <Button
              shape="round"
              className="Action__btn Active__btn"
              onClick={getTodoActiveStatus}
            >
              Active
            </Button>
            <Button
              shape="round"
              className="Action__btn Completed__btn"
              onClick={getTodoCompletedStatus}
            >
              Completed
            </Button>
          </div>
        </Col>
        <Col span={6} className="text-right">
          <Popconfirm
            title="Are you sure to delete all task？"
            okText="Yes"
            cancelText="No"
            onConfirm={onDeleteAllTodo}
          >
            <Button danger type="primary" shape="round" className="Action__btn">
              Clear All
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
};

export default TodoAction;
