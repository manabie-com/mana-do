import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
} from "../../store/actions";
import { TodoStatus } from "../../models/todo";
import reducer from "../../store/reducer";

describe("Test reducers", () => {
  it("Create Todo", () => {
    const state = {
      todos: [],
    };

    const resp = reducer(state, {
      type: CREATE_TODO,
      payload: {
        id: "todoid",
        user_id: "userid",
        content: "content",
        status: TodoStatus.ACTIVE,
        created_date: "date",
      },
    });

    expect(resp).toEqual({
      todos: [
        {
          id: "todoid",
          user_id: "userid",
          content: "content",
          status: TodoStatus.ACTIVE,
          created_date: "date",
        },
      ],
    });
  });

  it("Update Todo", () => {
    const state = {
      todos: [
        {
          id: "todoid",
          user_id: "userid",
          content: "oldcontent",
          status: TodoStatus.ACTIVE,
          created_date: "date",
        },
      ],
    };

    const resp = reducer(state, {
      type: UPDATE_TODO,
      payload: {
        todoId: "todoid",
        newTodo: "newcontent",
      },
    });

    expect(resp).toEqual({
      todos: [
        {
          id: "todoid",
          user_id: "userid",
          content: "newcontent",
          status: TodoStatus.ACTIVE,
          created_date: "date",
        },
      ],
    });
  });

  it("Update Todo Status", () => {
    const state = {
      todos: [
        {
          id: "todoid",
          user_id: "userid",
          content: "content",
          status: TodoStatus.ACTIVE,
          created_date: "date",
        },
      ],
    };

    const resp = reducer(state, {
      type: UPDATE_TODO_STATUS,
      payload: {
        todoId: "todoid",
        checked: true,
      },
    });

    expect(resp).toEqual({
      todos: [
        {
          id: "todoid",
          user_id: "userid",
          content: "content",
          status: TodoStatus.COMPLETED,
          created_date: "date",
        },
      ],
    });
  });

  it("Delete todo", () => {
    const state = {
      todos: [
        {
          id: "todoid",
          user_id: "userid",
          content: "content",
          status: TodoStatus.ACTIVE,
          created_date: "date",
        },
      ],
    };

    const resp = reducer(state, {
      type: DELETE_TODO,
      payload: "todoid",
    });

    expect(resp).toEqual({
      todos: [],
    });
  });

  it("Delete all todos", () => {
    const state = {
      todos: [
        {
          id: "todoid",
          user_id: "userid",
          content: "content",
          status: TodoStatus.COMPLETED,
          created_date: "date",
        },
        {
          id: "todoid2",
          user_id: "userid2",
          content: "content2",
          status: TodoStatus.ACTIVE,
          created_date: "date",
        },
        {
          id: "todoid3",
          user_id: "userid3",
          content: "content3",
          status: TodoStatus.ACTIVE,
          created_date: "date",
        },
      ],
    };

    const resp = reducer(state, {
      type: DELETE_ALL_TODOS,
    });

    expect(resp).toEqual({
      todos: [],
    });
  });

  it("Toggle all todos active", () => {
    const state = {
      todos: [
        {
          id: "todoid1",
          user_id: "userid",
          content: "content",
          status: TodoStatus.COMPLETED,
          created_date: "date",
        },
        {
          id: "todoid2",
          user_id: "userid2",
          content: "content2",
          status: TodoStatus.COMPLETED,
          created_date: "date",
        },
      ],
    };

    const resp = reducer(state, {
      type: TOGGLE_ALL_TODOS,
      payload: false,
    });

    expect(resp).toEqual({
      todos: [
        {
          id: "todoid1",
          user_id: "userid",
          content: "content",
          status: TodoStatus.ACTIVE,
          created_date: "date",
        },
        {
          id: "todoid2",
          user_id: "userid2",
          content: "content2",
          status: TodoStatus.ACTIVE,
          created_date: "date",
        },
      ],
    });
  });

  it("Toggle all todos completed", () => {
    const state = {
      todos: [
        {
          id: "todoid1",
          user_id: "userid",
          content: "content",
          status: TodoStatus.ACTIVE,
          created_date: "date",
        },
        {
          id: "todoid2",
          user_id: "userid2",
          content: "content2",
          status: TodoStatus.ACTIVE,
          created_date: "date",
        },
      ],
    };

    const resp = reducer(state, {
      type: TOGGLE_ALL_TODOS,
      payload: true,
    });

    expect(resp).toEqual({
      todos: [
        {
          id: "todoid1",
          user_id: "userid",
          content: "content",
          status: TodoStatus.COMPLETED,
          created_date: "date",
        },
        {
          id: "todoid2",
          user_id: "userid2",
          content: "content2",
          status: TodoStatus.COMPLETED,
          created_date: "date",
        },
      ],
    });
  });
});
