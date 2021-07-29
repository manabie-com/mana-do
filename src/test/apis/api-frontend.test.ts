import { TodoStatus } from 'root/models/todo';
import ApiFrontend from 'root/service/api-frontend'

describe('api-frontend', () => {
  test('toggleAllTodos should return value', async () => {

    jest.spyOn(window.localStorage.__proto__, 'setItem');
    window.localStorage.__proto__.setItem = jest.fn();
    
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn();

    const res = await ApiFrontend.toggleAllTodos(true)
    expect(res).not.toBeUndefined
    expect(res).not.toBeNull
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(res.message).toEqual('toggled all todo')
    expect(res.status).toEqual(200)
  })

  test('deleteTodo should return value', async () => {

    jest.spyOn(window.localStorage.__proto__, 'setItem');
    window.localStorage.__proto__.setItem = jest.fn();
    
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn();
    
    const res = await ApiFrontend.deleteTodo('todo-id-1')
    expect(res).not.toBeUndefined
    expect(res).not.toBeNull
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(res.message).toEqual('deleted todo todo-id-1')
    expect(res.status).toEqual(200)
  })

  test('deleteAllTodo should return value', async () => {

    jest.spyOn(window.localStorage.__proto__, 'setItem');
    window.localStorage.__proto__.setItem = jest.fn();
    
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn();
    
    const res = await ApiFrontend.deleteAllTodo()
    expect(res).not.toBeUndefined
    expect(res).not.toBeNull
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(res.message).toEqual('deleted all todo')
    expect(res.status).toEqual(200)
  })

  test('updateTodoContent should return value', async () => {

    jest.spyOn(window.localStorage.__proto__, 'setItem');
    window.localStorage.__proto__.setItem = jest.fn();
    
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn();
    
    const res = await ApiFrontend.updateTodoContent('todo-id-1', 'todo-content')
    expect(res).not.toBeUndefined
    expect(res).not.toBeNull
    expect(res.content).toEqual('todo-content')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  })

  test('createTodo should return value', async () => {

    jest.spyOn(window.localStorage.__proto__, 'setItem');
    window.localStorage.__proto__.setItem = jest.fn();
    
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn();
    
    const res = await ApiFrontend.createTodo('todo-content')
    expect(res).not.toBeUndefined
    expect(res).not.toBeNull
    expect(res.status).toEqual(TodoStatus.ACTIVE)
    expect(res.content).toEqual('todo-content')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  })

  test('getTodos should return value', async () => {

    jest.spyOn(window.localStorage.__proto__, 'setItem');
    window.localStorage.__proto__.setItem = jest.fn();
    
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn();
    
    const res = await ApiFrontend.getTodos()
    expect(res).not.toBeUndefined
    expect(res).not.toBeNull
    expect(res).toBeEmpty
    expect(res).toHaveLength
    expect(res.length).toEqual(0)
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  })
})
