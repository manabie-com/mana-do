import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";

import reducer, { initialState } from "./store/reducer";
import {
  setTodos,
  createTodo,
  toggleAllTodos,
  deleteAllTodos,
  deleteTodo,
  updateTodoStatus,
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { EnhanceTodoStatus, ITodoStore, TodoStatus } from "./models/todo";

const ToDoPage = () => {
  const [taskValue, setTaskValue] = useState("");
  const [editTodos, setEditTodos] = useState<ITodoStore>({});
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const checkIsSelectedAll = () => {
    let isChecked = !todos.some(
      (todoItem) => todoItem.status === TodoStatus.ACTIVE
    );
    setIsSelectedAll(isChecked);
  };

  useEffect(() => {
    checkIsSelectedAll();
  }, [todos]);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();
      dispatch(setTodos(resp || []));
    })();
  }, []);

  const handleAddTask = async () => {
    if (taskValue) {
      await Service.createTodo(taskValue).then((data) => {
        dispatch(createTodo(data));
        setTaskValue("");
        setIsSelectedAll(false);
      });
    }
  };

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: any
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteOneTodo = (todoId: string) => () => {
    dispatch(deleteTodo(todoId));
  };

  const editTodo = (id: string, content: string) => () => {
    setEditTodos({
      [id]: { content },
    });
  };

  const handleUpdateTodoContent = (id: string) => {
    if (editTodos[id]["content"]) {
      dispatch(updateTodoContent(id, editTodos[id]["content"]));
      setEditTodos({});
    }
  };

  const handleOnKeyPressTodoContent =
    (id: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleUpdateTodoContent(id);
      }
    };

  const onChangeEditTodo =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditTodos({
        [id]: { content: e.currentTarget.value },
      });
    };

  return (
    <Container
      m="auto"
      shadow="md"
      p="20px"
      borderRadius="md"
      borderColor="gray.100"
      borderWidth={1}
    >
      <div className="Todo__creation">
        <InputGroup>
          <Input
            value={taskValue}
            onChange={(event) => setTaskValue(event.target.value)}
            required
            ref={inputRef}
            placeholder="What need to be done?"
            onKeyDown={onCreateTodo}
          />
          {taskValue && (
            <InputRightElement
              cursor="pointer"
              onClick={() => setTaskValue("")}
            >
              <CloseIcon w={3} h={3} />
            </InputRightElement>
          )}
        </InputGroup>
      </div>
      <Flex gap={4} mt={4}>
        {!!todos.length && (
          <Checkbox
            isChecked={isSelectedAll}
            size="lg"
            bg="white"
            onChange={onToggleAllTodo}
          />
        )}
        <Flex gap={4}>
          <Button
            p="2px 10px"
            h={8}
            onClick={() => setShowing("ALL")}
            colorScheme={showing === "ALL" ? "blue" : "gray"}
          >
            All
          </Button>
          <Button
            p="2px 10px"
            h={8}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
            colorScheme={showing === TodoStatus.ACTIVE ? "blue" : "gray"}
          >
            Active
          </Button>
          <Button
            p="2px 10px"
            h={8}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
            colorScheme={showing === TodoStatus.COMPLETED ? "blue" : "gray"}
          >
            Completed
          </Button>
          <Button
            p="2px 10px"
            h={8}
            colorScheme="red"
            onClick={onDeleteAllTodo}
          >
            Clear All Tasks
          </Button>
        </Flex>
      </Flex>
      <div className="ToDo__list">
        {todos.map((todo) => {
          return todo.status === showing || showing === "ALL" ? (
            <Flex
              key={todo.id}
              gap={4}
              mt={4}
              alignItems="center"
              w="full"
              bg="gray.50"
              _hover={{ bg: "gray.100" }}
              p={2}
              borderRadius="md"
            >
              <Checkbox
                size="lg"
                isChecked={todo.status === TodoStatus.COMPLETED}
                checked={todo.status === TodoStatus.COMPLETED}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <Flex
                gap={4}
                alignItems="center"
                justifyContent="space-between"
                w="inherit"
              >
                {todo.id in editTodos ? (
                  <Input
                    borderColor="gray.400"
                    autoFocus
                    p="2px 5px"
                    h={8}
                    onBlur={() => setEditTodos({})}
                    onChange={onChangeEditTodo(todo.id)}
                    onKeyDown={handleOnKeyPressTodoContent(todo.id)}
                    defaultValue={todo.content}
                  />
                ) : (
                  <Text
                    cursor="text"
                    onDoubleClick={editTodo(todo.id, todo.content)}
                    w="inherit"
                  >
                    {todo.content}
                  </Text>
                )}
                <Button
                  p="2px 10px"
                  h={8}
                  bg="none"
                  _hover={{ bg: "gray.200" }}
                  _focus={{ boxShadow: "none" }}
                  onClick={onDeleteOneTodo(todo.id)}
                >
                  <DeleteIcon color="red.500" />
                </Button>
              </Flex>
            </Flex>
          ) : (
            ""
          );
        })}
      </div>
    </Container>
  );
};

export default ToDoPage;
