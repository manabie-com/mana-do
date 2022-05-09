import TodoItem from './TodoItem'
import React from 'react'
import { Todo } from '../models/todo'

function ToDoList({
  listTodos,
  onRemoveItem,
  filter,
  onUpdateData,
  onError,
}: {
  listTodos: any
  onRemoveItem: any
  filter: string
  onUpdateData: any
  onError: (mess: string) => void
}) {
  return (
    <div data-testid="list-todos">
      {listTodos?.length > 0 ? (
        listTodos.map((todo: Todo) => {
          return (
            <TodoItem
              onRemoveItem={onRemoveItem}
              key={todo.id + todo.status}
              data={todo}
              onUpdateData={onUpdateData}
              onError={onError}
            />
          )
        })
      ) : (
        <div>{filter ? `No data for filter ${filter}` : 'No data'}</div>
      )}
    </div>
  )
}

export default ToDoList

ToDoList.defaultProps = {
  listTodos: [],
  onRemoveItem: () => {},
  onUpdateData: () => {},
  filter: '',
  onError: () => {},
}
