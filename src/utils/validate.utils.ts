import { Todo } from "../models/todo";

export const validateBeforeLogin = (userId: string, password: string) => {
  const result = { isError: false, message: "" };

  if (userId.length === 0 && password.length === 0) {
    result.isError = true;
    result.message = "Please enter your user id and password.";
  } else if (userId.length === 0) {
    result.isError = true;
    result.message = "Please enter your user id.";
  } else if (password.length === 0) {
    result.isError = true;
    result.message = "Please enter your password.";
  }

  return result;
};

export const isDuplicateContent = (
  contentItem: string,
  listTodo: Todo[]
): boolean => {
  let isDuplicate = false;

  if (listTodo.length > 0) {
    listTodo.forEach((item) => {
      if (item.content === contentItem) {
        isDuplicate = true;
      }
    });
  }

  return isDuplicate;
};
