import {
  createTodo,
  deleteAllTodos,
  DELETE_ALL_TODOS,
  setTodos,
  SET_TODO,
  updateTodo,
  updateTodoStatus,
  UPDATE_TODO,
  UPDATE_TODO_STATUS
} from './store/actions';
import {
  CREATE_TODO
} from '../src/store/actions'
import {
  TodoStatus
} from "./models/todo";
import shortid from 'shortid';

let mockData = {
  content: 'xxxx',
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: shortid(),
  user_id: "firstUser",
}
let listTodo = [{
  content: 'xxxx',
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: shortid(),
  user_id: "firstUser",
}, {
  content: 'todo-1',
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: shortid(),
  user_id: "firstUser",
}, {
  content: 'todo-2',
  created_date: new Date().toISOString(),
  status: TodoStatus.ACTIVE,
  id: shortid(),
  user_id: "firstUser",
}];


describe('get list todo ', () => {
  it('should get list todo ', () => {
    const result = setTodos(mockData)
    expect(result).toMatchObject({
      payload: mockData,
      type: SET_TODO
    })
  })
})

describe('addTodo', () => {
  it('should add todo to the list', () => {
    const result = createTodo(mockData)
    expect(result).toMatchObject({
      payload: mockData,
      type: CREATE_TODO
    })
  })
})

describe('update todo status', () => {
  it('should update todo to status', () => {
    const expectResult = {
      ...mockData,
      status: TodoStatus.COMPLETED
    }
    const result = updateTodoStatus(expectResult.id, true)
    const finalResult = {
      ...result,
      payload: {
        ...mockData,
        status: result.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        id: result.payload.todoId
      }
    }
    expect(finalResult).toMatchObject({
      payload: expectResult,
      type: UPDATE_TODO_STATUS
    })
  })
})

describe('update todo content', () => {
  it('should update todo content', () => {
    const expectResult = {
      ...mockData,
      content: 'text'
    }
    const result = updateTodo('text', mockData.id)
    const finalResult = {
      ...result,
      payload: {
        ...mockData,
        content: result.payload.value,
        id: result.payload.todoId
      }
    }
    expect(finalResult).toMatchObject({
      payload: expectResult,
      type: UPDATE_TODO
    })
  })
})

// describe('DELETE TODO', () => {
//   it('should delete todo to the list', () => {
//     const result = deleteTodo(mockData)
//     const index = listTodo.findIndex(todo => todo.id === result.payload.id)
//     const expectResult = listTodo.splice(index,1)
//     console.log("🚀 ~ file: todo.test.js ~ line 119 ~ it ~ expectResult", expectResult)
//     expect(result).toMatchObject({
//       payload: expectResult,
//       type: DELETE_TODO,
//     })
//   })
// })


describe('delete all todo ', () => {
  it('should delete all todo to the list', () => {
    const result = deleteAllTodos()
    expect(result).toMatchObject({
      type: DELETE_ALL_TODOS
    })
  })
})