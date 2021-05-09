import { useQuery, useMutation } from 'react-query';
import shortid from 'shortid';

import { TodoStatus } from 'models/todo';
import todoService from 'service/todo';

export const useCreateTodo = () => {
  const { mutate, isLoading, reset } = useMutation((content: string) => {
    const data = {
      content,
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: shortid()
    };
    return todoService.create(data);
  });
  return {
    createTodo: mutate,
    isCreating: isLoading,
    reset
  };
};

export const useDeleteTodo = () => {
  const { mutate, isLoading } = useMutation(id => todoService.delete(id));
  return {
    deleteTodo: mutate,
    isDeleting: isLoading
  };
};

export const useDeleteTodos = () => {
  const { mutate, isLoading } = useMutation(todoService.deleteAll);
  return {
    deleteTodos: mutate,
    isDeleting: isLoading
  };
};

export const useUpdateTodo = () => {
  const { mutate, isLoading } = useMutation(data =>
    todoService.update(data.id, data)
  );
  return {
    updateTodo: mutate,
    isUpdating: isLoading
  };
};

export const useCompleteTodoAll = () => {
  const { mutate, isLoading } = useMutation(todoService.completeAll);
  return {
    completeAll: mutate,
    isCompletingAll: isLoading
  };
};

export const useActiveAll = () => {
  const { mutate, isLoading } = useMutation(todoService.activeAll);
  return {
    activeAll: mutate,
    isActivating: isLoading
  };
};

export const useTodos = () => {
  const { data, isFetching, isError } = useQuery('todos', todoService.list);

  return {
    todos: data ?? [],
    isLoading: isFetching,
    isError
  };
};
