import { Todo } from "../models/todo";
import TodoPage from "../ToDoPage";
import { AppState } from "./reducer";
import * as actions from "./actions";
import { Dispatch } from "react";
import { connect } from "react-redux";
export const mapStateToProps = ({ todos }: AppState) => {
  return {
    todos,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<actions.AppActions>) => {
  return {
    onCreateTodo: (todo: Todo) => dispatch(actions.createTodo(todo)),
    onUpdateTodoStatus: (todoId: string, checked: boolean) =>
      dispatch(actions.updateTodoStatus(todoId, checked)),
    deleteTodo: (todoId: string) => dispatch(actions.deleteTodo(todoId)),
  };
};

export const mergeProps = (
  stateProps: Object,
  dispatchProps: Object,
  ownProps: Object
) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
};

const todoList = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TodoPage);

export default todoList;
