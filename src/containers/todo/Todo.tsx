import React, {useEffect, useRef, useState} from 'react';
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import useTodoReducer, {ITodoState} from '../../store/todo/TodoReducer';
import TodoActionsCreator from '../../store/todo/TodoActions';
import Classes from './Todo.module.scss';
import TodoActions from './todo-actions/TodoActions';
import TodoItem from './todo-item/TodoItem';
import {Todo, TodoStatus} from '../../models/todo';

const ToDo = () => {
  const [filterStatus, setFilterStatus] = useState();
  const [state, dispatch] = useTodoReducer();
  const {todos} = state as ITodoState;
  const filteredTodos = filterStatus
    ? todos.filter(todo => todo.status === filterStatus)
    : todos;
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    dispatch(TodoActionsCreator.fetchTodos())
  }, [])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current && inputRef.current.value) {
      dispatch(TodoActionsCreator.addTodo(inputRef.current.value));
      inputRef.current.value = '';
    }
  }

  const removeTodo = (id: string) => {
    dispatch(TodoActionsCreator.removeTodo(id));
  }

  const updateTodo = (id: string, content: string) => {
    dispatch(TodoActionsCreator.updateTodo(id, {
      content
    }));
  };

  const changeTodoStatus = (id: string, status: TodoStatus) => {
    dispatch(TodoActionsCreator.updateTodo(id, {
      status
    }));
  }

  const rearrangeTodos = (todos: Todo[]) => {
    dispatch(TodoActionsCreator.rearrangeTodo(todos));
  }

  const removeAllTodos = () => {
    dispatch(TodoActionsCreator.removeAllTodos());
  }

  const toggleAllTodos = (checked: boolean) => {
    const status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
    dispatch(TodoActionsCreator.updateAllTodosStatus(status, todos));
    setFilterStatus('');
  }

  const reorder = (items: Todo[], fromIndex: number, toIndex: number) => {
    const result = [...items];
    const [removed] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {

    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const updatedTodos = reorder(
      todos,
      result.source.index,
      result.destination.index
    );
    rearrangeTodos(updatedTodos);
  }
  return (
    <div className={Classes.TodoContainer}>
      <div className={Classes.CreateTodo}>
        <input
          ref={inputRef}
          placeholder="What needs to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className={Classes.TodoList}>
        <TodoActions
          todos={todos}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          removeAllTodos={removeAllTodos}
          toggleAllTodos={toggleAllTodos}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filteredTodos.map(
                  (todo, index) => {
                    return (
                      <TodoItem
                        key={todo.id}
                        index={index}
                        todo={todo}
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                        changeTodoStatus={changeTodoStatus}
                        isActiveRearrange={!filterStatus}
                      />
                    );
                  }
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ToDo;