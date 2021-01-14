import React, { useEffect, useReducer, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ButtonConfirm from '../../components/Buttons/ButtonConfirm';
import FormBasic from '../../components/Forms/FormBasic';
import InputSingle from '../../components/Inputs/InputSingle';
import Column from '../../components/Layouts/Column';
import Row from '../../components/Layouts/Row';
import TextWarning from '../../components/Text/TextWarning';
import { TodoFilters, TodoStatus } from '../../models/todo';
import Service from '../../service';
import {
  createTodo,
  deleteAllTodos, deleteTodo, setTodos,
  toggleAllTodos,
  updateTodoStatus
} from '../../store/actions';
import reducer, { initialState } from '../../store/reducer';
import { isTodoCompleted } from '../../utils';


const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<TodoFilters>(TodoFilters.ALL);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })()
  }, [])

  const onChangeTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  }

  const onSubmitTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const resp = await Service.createTodo(todo);
      dispatch(createTodo(resp));
      setTodo('');
    } catch (e) {
      if (e.response.status === 401) {
        history.push('/')
      }
    }
  }

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked))
  }

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  }

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoFilters.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoFilters.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <Column m={6} p={6}>
      <Row fullWidth>
        <FormBasic fullWidth onSubmit={onSubmitTodo} >
          <InputSingle
            fullWidth
            className="Todo__input"
            placeholder="What needs to be done?"
            value={todo}
            onChange={onChangeTodo}
          />
        </FormBasic>
      </Row>
      <ButtonConfirm onClick={onDeleteAllTodo} fullWidth>
        Clear all todos
      </ButtonConfirm>

      {showTodos.length
        ? <Column>
          {
            showTodos.map((todo, index) => {
              return (
                <div key={index} className="ToDo__item">
                  <input
                    type="checkbox"
                    checked={isTodoCompleted(todo)}
                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                  />
                  <span>{todo.content}</span>
                  <button
                    className="Todo__delete"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                  >
                    X
                </button>
                </div>
              );
            })
          }
        </Column>
        : <TextWarning>You do not have any todos yet!</TextWarning>
      }
      <Row>
        {todos.length > 0 ?
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          /> : <div />
        }
        <Row>
          <ButtonConfirm onClick={() => setShowing(TodoFilters.ALL)}>
            All
          </ButtonConfirm>
          <ButtonConfirm onClick={() => setShowing(TodoFilters.ACTIVE)}>
            Active
          </ButtonConfirm>
          <ButtonConfirm onClick={() => setShowing(TodoFilters.COMPLETED)}>
            Completed
          </ButtonConfirm>
        </Row>
      </Row>
    </Column>
  );
};

export default ToDoPage;