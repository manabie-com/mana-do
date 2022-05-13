import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import StarIcon from '@mui/icons-material/Star';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { ImageButton } from '../components/ImageButton';
import { Task } from '../components/Task';
import { TodoStatus } from '../models/todo';
import Service from '../service';
import {
  createTodo,
  deleteTodos,
  setTodos,
  updateTodoContent,
  updateTodoStatus,
} from '../store/actions';
import reducer, { initialState } from '../store/reducer';

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef<any>(null);

  const doingTasks = todos.filter(
    (todo) => todo.status !== TodoStatus.COMPLETED
  );
  const doneTasks = todos.filter(
    (todo) => todo.status === TodoStatus.COMPLETED
  );
  const [idsSelected, setIdsSelected] = useState<string[]>([]);
  const isAllSelected =
    !!doingTasks.length && doingTasks.length === idsSelected.length;

  useEffect(() => {
    todos.length === 0 &&
      (async () => {
        const resp = await Service.getTodos();
        dispatch(setTodos(resp || []));
      })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = '';
    }
  };

  const onChangeTodosStatus = (status: TodoStatus) => () => {
    dispatch(updateTodoStatus(idsSelected, status));
    setIdsSelected([]);
  };

  const onToogleActive = (todoId: string, status: TodoStatus) => {
    dispatch(updateTodoStatus([todoId], status));
  };

  const onDeleteTodos = (todoIds: string[]) => {
    dispatch(deleteTodos(todoIds));
    const idsFiltered = idsSelected.filter((id) => !todoIds.includes(id));
    setIdsSelected(idsFiltered);
  };

  const onDeleteTodo = (todoId: string) => {
    onDeleteTodos([todoId]);
  };

  const onChangeContent = (todoId: string, content: string) => {
    dispatch(updateTodoContent(todoId, content));
  };

  const onToogleAllTodoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIdsSelected(!isChecked ? [] : doingTasks.map((d) => d.id));
  };

  const onToogleTodoSelect = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setIdsSelected([...idsSelected, id]);
    } else {
      const ids = idsSelected.filter((i) => i !== id);
      setIdsSelected(ids);
    }
  };

  const onChange2Doing = (id: string) => {
    onToogleActive(id, TodoStatus.NEW);
  };

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      {doingTasks.length > 0 && [
        <div className="Todo__toolbar">
          <input
            checked={isAllSelected}
            type="checkbox"
            onChange={onToogleAllTodoSelect}
          />
          {!!idsSelected.length && (
            <div className="Todo__tabs">
              <ImageButton
                defaultColor={'green'}
                IconComponent={DoneAllIcon}
                instruction={'Mask selected tasks done'}
                onPress={onChangeTodosStatus(TodoStatus.COMPLETED)}
              />
              <ImageButton
                defaultColor={'#FDC508'}
                IconComponent={StarIcon}
                instruction={'Active selected tasks'}
                onPress={onChangeTodosStatus(TodoStatus.ACTIVE)}
              />
              <ImageButton
                defaultColor={'red'}
                IconComponent={DeleteForeverIcon}
                instruction={'Delete selected tasks'}
                onPress={() => onDeleteTodos(idsSelected)}
              />
            </div>
          )}
        </div>,
        <div className="Todo__dash"></div>,
      ]}

      <div className="ToDo__list">
        {doingTasks.map((todo, index) => {
          return (
            <Task
              key={todo.id}
              isSelected={idsSelected.includes(todo.id)}
              task={todo}
              onDelete={onDeleteTodo}
              onCheckboxChange={onToogleTodoSelect}
              onToogleActive={onToogleActive}
              onChangeContent={onChangeContent}
            />
          );
        })}
      </div>
      {!!doneTasks.length && (
        <>
          <p className="ToDo__done__title">Done {doneTasks.length} tasks:</p>
          <div className="ToDo__list">
            {doneTasks.map((todo, index) => {
              return (
                <Task
                  key={todo.id}
                  isSelected={idsSelected.includes(todo.id)}
                  task={todo}
                  onDelete={onDeleteTodo}
                  onCheckboxChange={onToogleTodoSelect}
                  onToogleActive={onToogleActive}
                  onChangeContent={onChangeContent}
                  onChange2Doing={onChange2Doing}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ToDoPage;
