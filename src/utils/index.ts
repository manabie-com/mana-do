import { TodoStatus } from '../models/todo'

export const isTodoCompleted = (status?: TodoStatus): boolean => status === TodoStatus.COMPLETED

export const isTodoActive = (status?: TodoStatus): boolean => status === TodoStatus.ACTIVE

export const getTodoStatus = (checked: boolean): TodoStatus => checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
