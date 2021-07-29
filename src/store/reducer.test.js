import reducer from "./reducer";
import expect from "expect";

const todoA = {
  content: "A",
  created_date: "2021-07-28T06:36:52.263Z",
  id: "YKZtNIc7B",
  status: "ACTIVE",
  user_id: "firstUser"
};
const todoB = {
  content: "B",
  created_date: "2021-07-28T06:36:52.263Z",
  id: "YKZtNIc7Y",
  status: "ACTIVE",
  user_id: "firstUser"
};
const todoC = {
  content: "C",
  created_date: "2021-07-28T06:36:52.263Z",
  id: "YKZtNIc7C",
  status: "ACTIVE",
  user_id: "firstUser"
};

describe("post reducer", () => {
  //-------------------------------------------------------------
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(undefined);
  });
  //-------------------------------------------------------------
  it("should handle SET_TODO", () => {
    const startAction = {
      type: "SET_TODO",
      payload: [todoA]
    };
    const _state = {
      todos: []
    };
    expect(reducer(_state, startAction)).toEqual({
      todos: [todoA]
    });
  });

  //-------------------------------------------------------------
  it("should handle CREATE_TODO", () => {
    const startAction = {
      type: "CREATE_TODO",
      payload: todoC
    };
    const _state = {
      todos: [todoB]
    };
    expect(reducer(_state, startAction)).toEqual({
      todos: [todoB, todoC]
    });
  });
  //-------------------------------------------------------------
  it("should handle UPDATE_TODO_STATUS", () => {
    const startAction = {
      type: "UPDATE_TODO_STATUS",
      payload: {
        todoId: "YKZtNIc7Y",
        checked: true
      }
    };
    const _state = {
      todos: [todoA, todoB, todoC]
    };
    expect(reducer(_state, startAction)).toEqual({
      todos: [
        todoA,
        {
          content: "B",
          created_date: "2021-07-28T06:36:52.263Z",
          id: "YKZtNIc7Y",
          status: "COMPLETED",
          user_id: "firstUser"
        },
        todoC
      ]
    });
  });
  //-------------------------------------------------------------
  it("should handle UPDATE_TODO", () => {
    const startAction = {
      type: "UPDATE_TODO",
      payload: {
        todoId: "YKZtNIc7Y",
        content: "new content"
      }
    };
    const _state = {
      todos: [todoA, todoB, todoC]
    };
    expect(reducer(_state, startAction)).toEqual({
      todos: [
        todoA,
        {
          content: "new content",
          created_date: "2021-07-28T06:36:52.263Z",
          id: "YKZtNIc7Y",
          status: "COMPLETED",
          user_id: "firstUser"
        },
        todoC
      ]
    });
  });
  //-------------------------------------------------------------
  it("should handle TOGGLE_ALL_TODOS", () => {
    const startAction = {
      type: "TOGGLE_ALL_TODOS",
      payload: true
    };
    const _state = {
      todos: [todoA, todoB, todoC]
    };
    expect(reducer(_state, startAction)).toEqual({
      todos: [
        {
          ...todoA,
          status: "COMPLETED"
        },
        {
          ...todoB,
          status: "COMPLETED"
        },
        {
          ...todoC,
          status: "COMPLETED"
        }
      ]
    });
  });
  //-------------------------------------------------------------
  it("should handle DELETE_TODO", () => {
    const startAction = {
      type: "DELETE_TODO",
      payload: "YKZtNIc7B"
    };
    const _state = {
      todos: [todoA, todoB, todoC]
    };
    expect(reducer(_state, startAction)).toEqual({
      todos: [todoB, todoC]
    });
  });

  //-------------------------------------------------------------
  it("should handle DELETE_ALL_TODOS", () => {
    const startAction = {
      type: "DELETE_ALL_TODOS"
    };
    const _state = {
      todos: [todoA, todoB, todoC]
    };
    expect(reducer(_state, startAction)).toEqual({
      todos: []
    });
  });
});
