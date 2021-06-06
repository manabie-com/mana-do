import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import reducer, { initialState } from 'store/todo/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
} from 'store/todo/actions';
import Service from 'service';
import { EnhanceTodoStatusType, TodoStatus } from 'models/todo';
import { isTodoCompleted } from 'utils';
import Checkbox from 'components/Form/Checkbox';
import Container from 'components/Container';
import Card from 'components/Surfaces/Card';
import TextInput from 'components/Form/TextInput';
import Box from 'components/Box';
import Button from 'components/Buttons/PrimaryButton';
import globalTheme from 'globalTheme';
import DeleteButton from 'components/Buttons/DeleteButton';
import TodoToolbar from 'components/Todo/Toolbar';

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  console.log('todos', todos);
  const [showing, setShowing] = useState<EnhanceTodoStatusType>('ALL');

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const resp = await Service.createTodo(e.currentTarget.value);
        dispatch(createTodo(resp));
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/');
        }
      }
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const fetchList = async () => {
    const resp = await Service.getTodos();
    dispatch(setTodos(resp || []));
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" margin="2rem 0 0 0">
        <Card background={globalTheme.color.background}>
          <Box margin="0 0 1rem">
            <TextInput
              fullWidth={true}
              placeholder="What need to be done?"
              onKeyDown={onCreateTodo}
            />
          </Box>

          <div>
            {showTodos.map((todo, index) => {
              return (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding="0.2rem"
                >
                  <Checkbox
                    checked={isTodoCompleted(todo)}
                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                  />
                  <Box padding="0 1rem">{todo.content}</Box>
                  <DeleteButton onClick={() => dispatch(deleteTodo(todo.id))} />
                </Box>
              );
            })}
          </div>
          <TodoToolbar>
            {/* <div> */}
            <Checkbox
              checked={activeTodos === 0 && todos.length !== 0}
              onChange={onToggleAllTodo}
              disabled={todos.length === 0}
            />
            {/* </div> */}

            <Box textAlign="center">
              <Button onClick={() => setShowing('ALL')}>All</Button>
              <Button onClick={() => setShowing(TodoStatus.ACTIVE)}>
                Active
              </Button>
              <Button onClick={() => setShowing(TodoStatus.COMPLETED)}>
                Completed
              </Button>
            </Box>

            <Button width="200px" variant="secondary" onClick={onDeleteAllTodo}>
              Clear all
            </Button>
          </TodoToolbar>
        </Card>
      </Box>
    </Container>
  );
};

export default ToDoPage;
