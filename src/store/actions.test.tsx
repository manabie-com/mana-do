
import reducer, { AppState } from "./reducer";

describe("Action", () => {
  test("SET_TODO", () => {
    const initialState: AppState = {
      todos: [],
    };
    expect(
      reducer(initialState, {
        type: "SET_TODO",
        payload: [
          {
            content: "To do from remote api",
            created_date: "2022-05-02T10:10:29.589Z",
            id: "5KqmfF_Z_",
            status: "ACTIVE",
            user_id: "firstUser",
          },
        ],
      })
    ).toEqual({
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
      ],
    });
  });
  test("CREATE_TODO", () => {
    const initialState: AppState = {
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
      ],
    };
    expect(
      reducer(initialState, {
        type: "CREATE_TODO",
        payload: {
          content: "another todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "ACTIVE",
          user_id: "firstUser",
        },
      })
    ).toEqual({
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
        {
          content: "another todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "ACTIVE",
          user_id: "firstUser",
        },
      ],
    });
  });
  test("UPDATE_TODO_STATUS", () => {
    const initialState: AppState = {
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
        {
          content: "another todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "ACTIVE",
          user_id: "firstUser",
        },
      ],
    };
    expect(
      reducer(initialState, {
        type: "UPDATE_TODO_STATUS",
        payload: { todoId: "lpRQLfKNP", checked: true },
      })
    ).toEqual({
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
        {
          content: "another todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "COMPLETED",
          user_id: "firstUser",
        },
      ],
    });
  });

  test("UPDATE_TODO", () => {
    const initialState: AppState = {
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
        {
          content: "another todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "COMPLETED",
          user_id: "firstUser",
        },
      ],
    };
    expect(
      reducer(initialState, {
        type: "UPDATE_TODO",
        payload: { todoId: "lpRQLfKNP", content: "Updated todo" },
      })
    ).toEqual({
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
        {
          content: "Updated todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "COMPLETED",
          user_id: "firstUser",
        },
      ],
    });
  });
  test("TOGGLE ALL TODO TO COMPLETED", () => {
    const initialState: AppState = {
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
        {
          content: "Updated todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "COMPLETED",
          user_id: "firstUser",
        },
      ],
    };
    expect(
      reducer(initialState, {
        type: "TOGGLE_ALL_TODOS",
        payload: true,
      })
    ).toEqual({
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "COMPLETED",
          user_id: "firstUser",
        },
        {
          content: "Updated todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "COMPLETED",
          user_id: "firstUser",
        },
      ],
    });
  });

  test("TOGGLE ALL TODO TO ACTIVE", () => {
    const initialState: AppState = {
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "COMPLETED",
          user_id: "firstUser",
        },
        {
          content: "Updated todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "COMPLETED",
          user_id: "firstUser",
        },
      ],
    };
    expect(
      reducer(initialState, {
        type: "TOGGLE_ALL_TODOS",
        payload: false,
      })
    ).toEqual({
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
        {
          content: "Updated todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "ACTIVE",
          user_id: "firstUser",
        },
      ],
    });
  });
  test("DELETE TODO", () => {
    const initialState: AppState = {
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
        {
          content: "another todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "COMPLETED",
          user_id: "firstUser",
        },
      ],
    };
    expect(
      reducer(initialState, {
        type: "DELETE_TODO",
        payload: "lpRQLfKNP",
      })
    ).toEqual({
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
      ],
    });
  });
  test("DELETE ALL TODO", () => {
    const initialState: AppState = {
      todos: [
        {
          content: "To do from remote api",
          created_date: "2022-05-02T10:10:29.589Z",
          id: "5KqmfF_Z_",
          status: "ACTIVE",
          user_id: "firstUser",
        },
        {
          content: "another todo",
          created_date: "2022-05-02T10:38:59.078Z",
          id: "lpRQLfKNP",
          status: "COMPLETED",
          user_id: "firstUser",
        },
      ],
    };
    expect(
      reducer(initialState, {
        type: "DELETE_ALL_TODOS",
      })
    ).toEqual({
      todos: [],
    });
  });
});
