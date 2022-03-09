import { TodoStatus } from "./todo";

export enum ExtendedTodoFilter { ALL = 'ALL'}
export type EnhanceTodoStatus = TodoStatus | ExtendedTodoFilter;