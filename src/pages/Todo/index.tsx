import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import MainLayout from "layouts/MainLayout";
import { TodoStatus } from "models/todo";
import { isTodoCompleted } from "utils";
import Toolbar from "./components/Toolbar";
import CreateTodo from "./components/CreateTodo";
import TodoThunks from "./Todo.thunks";
import {
  TodoContainer,
  TodoLogo,
  TodoWrapper,
  TodoContent,
} from "./Todo.styles";
import logoImg from "assets/images/logo.svg";
import emptyListImg from "assets/images/empty-list.svg";
import { Alert } from "styles/Alert.styles";
import { FiAlertOctagon } from "react-icons/fi";
import TodoItems from "./components/TodoItem";

type EnhanceTodoStatus = TodoStatus | "ALL";

const mapStateToProps = (state) => {
  return {
    todoList: state.todo.todoList,
  };
};

const mapDispatchToProps = {
  getTodoList: TodoThunks.getTodoList,
  createTodo: TodoThunks.createTodo,
  updateTodo: TodoThunks.updateTodo,
  updateAllTodo: TodoThunks.updateAllTodo,
  deleteAllTodo: TodoThunks.deleteAllTodo,
  deleteTodo: TodoThunks.deleteTodo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {}
const TodoPage = (props: Props) => {
  const {
    getTodoList,
    createTodo,
    updateTodo,
    updateAllTodo,
    deleteAllTodo,
    todoList,
    deleteTodo,
  } = props;
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [error, setError] = useState<String>("");

  const todoListAvailable = todoList.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });
  const isActiveView = todoList.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  useEffect(() => {
    getTodoList();
  }, [getTodoList]);

  const handleCreate = (value: string, cb: Function) => {
    if (!value) {
      setError("Please enter todo content");
      return;
    }
    createTodo(value)
      .then((resp) => {
        cb && cb();
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const updateTodoList = (id: string, field: string, value: string) => {
    updateTodo({
      id,
      field,
      value,
    })
      .then((resp) => {})
      .catch((error) => {
        setError(error?.message);
      });
  };

  const onUpdateTodoStatus = (isCompleted: boolean, todoId: string) => {
    const statusValue = isCompleted ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    updateTodoList(todoId, "status", statusValue);
  };
  const onUpdateTodoContent = (content: string, todoId: string, cb: any) => {
    if (!content) {
      setError("Content can't empty");
      return;
    }
    updateTodoList(todoId, "content", content);
  };
  const onToggleAllTodo = (e: boolean) => {
    updateAllTodo(e);
  };
  const onDeleteAllTodo = () => {
    if (
      !todoListAvailable ||
      (todoListAvailable && !todoListAvailable.length)
    ) {
      return;
    }
    deleteAllTodo();
  };

  const onClickDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  return (
    <MainLayout>
      <TodoContainer>
        <TodoLogo>
          <img src={logoImg} width="150px" height="50px" alt="logo" />
        </TodoLogo>
        {error && (
          <Alert className="mt-8">
            <FiAlertOctagon fontSize="24px" />
            <span className="pl-8">{error}</span>
          </Alert>
        )}
        <TodoWrapper>
          <CreateTodo handleCreate={handleCreate} />
          <TodoContent>
            {todoList && todoList.length ? (
              <Toolbar
                isActiveView={isActiveView === 0}
                onToggleAllTodo={onToggleAllTodo}
                onClickTab={setShowing}
                listStatus={[
                  {
                    value: "ALL",
                    label: "All",
                  },
                  {
                    value: TodoStatus.ACTIVE,
                    label: "Active",
                  },
                  {
                    value: TodoStatus.COMPLETED,
                    label: "Completed",
                  },
                ]}
                onDeleteAllTodo={onDeleteAllTodo}
              />
            ) : null}
            <div className="scroll-bar">
              {todoListAvailable.length ? (
                <>
                  {todoListAvailable.map((todo, index) => {
                    return (
                      <TodoItems
                        key={index}
                        onClickDeleteTodo={onClickDeleteTodo}
                        onUpdateTodoStatus={onUpdateTodoStatus}
                        onUpdateTodoContent={onUpdateTodoContent}
                        todo={todo}
                      />
                    );
                  })}
                </>
              ) : (
                <div className="text-center pt-8">
                  <img
                    src={emptyListImg}
                    width="300px"
                    height="300px"
                    alt="empty-task"
                  />
                  <br />
                  <h5>No Tasks</h5>
                </div>
              )}
            </div>
          </TodoContent>
        </TodoWrapper>
      </TodoContainer>
    </MainLayout>
  );
};

export default connector(TodoPage);
