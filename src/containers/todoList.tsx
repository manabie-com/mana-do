import TodoList from "../ToDoPage";
import * as actions from "../store/actions";
import { AppState } from "../store/reducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Todo } from "../models/todo";

//This tsx is use to merge data from browser to Redux
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
)(TodoList);

export default todoList;
