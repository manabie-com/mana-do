import React from "react";

import { TodoLoadingStatus, TodoStatus } from "../../../models/todo";
import { useAppContext } from "../../../AppContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TodoListItems from "../TodoListItems";
import { LoaderWrap, Wrapper } from "./styles";
import { setTodos } from "../../../store/actions";
import { TODO_ITEM_HEIGHT } from "../../../utils/constants";

const TodoList = () => {
  const {
    state: {
      todos,
      todosLoadStatus,
      filter: { status },
    },
    dispatch,
  } = useAppContext();

  if (todosLoadStatus === TodoLoadingStatus.Loading) {
    return (
      <LoaderWrap>
        <div className="loader">Loading...</div>
      </LoaderWrap>
    );
  }

  const showTodos = todos.filter((todo) => {
    switch (status) {
      case TodoStatus.Active:
        return todo.status === TodoStatus.Active;
      case TodoStatus.Completed:
        return todo.status === TodoStatus.Completed;
      default:
        return true;
    }
  });
  const renderedListItems = showTodos.map((todo, index) => <TodoListItems key={todo.id} id={todo.id} index={index} />);

  return (
    <Wrapper style={{ height: showTodos.length * TODO_ITEM_HEIGHT }}>
      <DragDropContext
        onDragEnd={(data) => {
          const srcIndex = data.source.index;
          const destIndex = data.destination?.index || 0;
          console.log({ srcIndex, destIndex });

          // sort
          const temp = [...todos];
          console.log(temp);
          temp.splice(destIndex, 0, temp.splice(srcIndex, 1)[0]);
          dispatch(setTodos(temp));
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {renderedListItems}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};

export default TodoList;
