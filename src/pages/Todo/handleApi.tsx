import { useCallback, useState } from "react";

/* Models */
import { Todo, TodoStatus } from "src/models/todo";

/* Actions */
import {
  AppActions,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
  toggleAllTodos
} from "src/store/actions";

/* Services */
import Service from "src/service";

export const useCreate = (dispatch: React.Dispatch<AppActions>) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleCreateTodo = useCallback(
    async (value: string) => {
      try {
        const content = value.trim();
        if (content.length > 0) {
          const resp = await Service.createTodo(content);
  
          dispatch(createTodo(resp));
        } else {
          setMessage("Please input value");
          setError(true);
        }
      } catch (e) {
        setMessage("Something error");
        setError(true);
      }
    },
    [dispatch],
  );

  const clearErrorCreate = useCallback(() => {
    setError(false);
    setMessage("");
  }, [])

  return { handleCreateTodo, clearErrorCreate, errorCreate: error, messageCreate: message };
};

export const useUpdate = (dispatch: React.Dispatch<AppActions>) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleUpdateTodo = useCallback(async (todo: Todo) => {
    try {
      const content = todo.content.trim();

      if (content.length > 0) {
        const data = await Service.updateTodo(todo);

        dispatch(updateTodo(data));
      } else {
        setMessage("Please input value");
        setError(true);
      }
    } catch (e) {
      setMessage("Something error");
      setError(true);
    }
  }, [dispatch]);

  const clearErrorUpdate = useCallback(() => {
    setError(false);
    setMessage("");
  }, [])

  return { handleUpdateTodo, clearErrorUpdate, errorUpdate: error, messageUpdate: message };
};

export const useUpdateAll = (dispatch: React.Dispatch<AppActions>) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleUpdateAllTodo = useCallback(async (checked: boolean) => {
    try {
      const status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      const data = await Service.updateAllStatusTodo(status);

      if (data === "Success") {
        dispatch(toggleAllTodos(status));
      } else {
        setMessage("Something error");
        setError(true);
      }
    } catch (e) {
      setMessage("Something error");
      setError(true);
    }
  }, [dispatch]);

  const clearErrorUpdateAll = useCallback(() => {
    setError(false);
    setMessage("");
  }, [])

  return { handleUpdateAllTodo, clearErrorUpdateAll, errorUpdateAll: error, messageUpdateAll: message };
};

export const useDelete = (dispatch: React.Dispatch<AppActions>) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleDeleteTodo = useCallback(async (id: string) => {
    try {
      const res = await Service.deleteTodo(id);
      if (res === "Success") {
        dispatch(deleteTodo(id));
      } else {
        setMessage("Something error");
        setError(true);
      }
    } catch (e) {
      setMessage("Something error");
      setError(true);
    }
  }, [dispatch]);

  const clearErrorDelete = useCallback(() => {
    setError(false);
    setMessage("");
  }, [])

  return { handleDeleteTodo, clearErrorDelete, errorDelete: error, messageDelete: message };
};

export const useDeleteAll = (dispatch: React.Dispatch<AppActions>) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleDeleteAllTodo = useCallback(async () => {
    try {
      const data = await Service.deleteAllTodo();

      if (data === "Success") {
        dispatch(deleteAllTodos());
      } else {
        setMessage("Something error");
        setError(true);
      }
    } catch (e) {
      setMessage("Something error");
      setError(true);
    }
  }, [dispatch]);

  const clearErrorDeleteAll = useCallback(() => {
    setError(false);
    setMessage("");
  }, [])

  return { handleDeleteAllTodo, clearErrorDeleteAll, errorDeleteAll: error, messageDeleteAll: message };
};
