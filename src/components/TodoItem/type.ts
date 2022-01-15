import React from 'react'
import type {Todo} from '../../models/todo'

export type TodoItemProps = {
  data: Todo
  onChangeStatus: (event: React.ChangeEvent<HTMLInputElement>, todoId: string) => void
  onDelete: (event: React.MouseEvent<HTMLButtonElement>, todoId: string) => void
  onEdit: (todo: Todo) => void
}