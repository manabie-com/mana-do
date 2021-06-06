import React from 'react';
import { deleteTodo } from 'store/todo/actions';
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
import TodoContent from 'components/Todo/TodoContent';
import useTodoHook from './hook';

// remove unused history props
const ToDoPage = () => {
  // move all useReducer & useState & func to hook file
  const {
    todos,
    inputRef,
    dispatch,
    onCreateTodo,
    onUpdateTodoStatus,
    onToggleAllTodo,
    onDeleteAllTodo,
    showTodos,
    activeTodos,
    handleContentChange,
    handleShowAll,
    handleShowActive,
    handleShowCompleted,
  } = useTodoHook();

  return (
    <Container>
      <Box display="flex" justifyContent="center" margin="2rem 0 0">
        <Card background={globalTheme.color.background}>
          <Box margin="0 0 1rem">
            <TextInput
              inputRef={inputRef}
              fullWidth={true}
              placeholder="What need to be done?"
              onKeyDown={onCreateTodo}
            />
          </Box>

          <div data-testid="todo-list">
            {showTodos.map((todo, index) => {
              return (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding="0.2rem"
                  data-testid="todo-item"
                >
                  <Checkbox
                    checked={isTodoCompleted(todo)}
                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                  />
                  <TodoContent
                    rowIndex={index}
                    content={todo.content}
                    onContentChange={handleContentChange}
                  />
                  <DeleteButton onClick={() => dispatch(deleteTodo(todo.id))} />
                </Box>
              );
            })}
          </div>

          <TodoToolbar>
            <Checkbox
              checked={activeTodos === 0 && todos.length !== 0}
              onChange={onToggleAllTodo}
              disabled={todos.length === 0}
            />

            <Box textAlign="center">
              <Button onClick={handleShowAll}>All</Button>
              <Button onClick={handleShowActive}>Active</Button>
              <Button onClick={handleShowCompleted}>Completed</Button>
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
