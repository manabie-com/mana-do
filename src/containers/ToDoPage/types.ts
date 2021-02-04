import { EntityState } from '@reduxjs/toolkit';
import { Todo, TodoStatus } from 'models/todo';

export interface ToDoPageState extends EntityState<Todo> {
  filter: string;
}

export type ContainerState = ToDoPageState;

export type EnhanceTodoStatus = TodoStatus | 'ALL';
