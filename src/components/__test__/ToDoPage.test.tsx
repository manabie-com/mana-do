import React from 'react'
import { mount, shallow } from 'enzyme'

import useStore from '../../hooks/useStore'
import ToDoPage from '../ToDoPage'
import { fakeTodoList } from '../../test/liveState'
import { AppState } from '../../types/AppState'
import * as actions from '../../store/actions'
jest.mock('../../hooks/useStore')

const getInitState = (overlay: any = {}): AppState => ({
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  todos: fakeTodoList,
  ...overlay,
})

const dispatch = jest.fn()

afterEach(() => jest.restoreAllMocks())

describe('Render ToDo page', () => {
  test('should render todo list correctly', () => {
    const initState = getInitState()
    useStore.mockImplementation(() => [initState, dispatch])
    const todoItems = shallow(<ToDoPage />).find('TodoItem')

    expect(todoItems).toHaveLength(3)
    todoItems.map((item, index) => {
      expect(item.prop('todo').id).toEqual(initState.todos[index].id)
    })
  })

  test('should render loading spinner when todos is loading', () => {
    const initState = getInitState({ isLoading: true })
    useStore.mockImplementation(() => [initState, dispatch])
    const component = shallow(<ToDoPage />)

    expect(component.find('Spinner').exists()).toBe(true)
  })

  test('should render loading spinner when there is no todos', () => {
    const initState = getInitState({ todos: [] })
    useStore.mockImplementation(() => [initState, dispatch])
    const component = shallow(<ToDoPage />)

    expect(component.find('h2').text()).toBe("Yay! You don't have a job today")
  })
})

describe('Todo input', () => {
  test('should dispatch createTodo action when use typed content and press enter', () => {
    const createTodoMockAction = jest.spyOn(actions, 'createTodo').mockReturnValue('createTodo')
    const initState = getInitState()
    useStore.mockImplementation(() => [initState, dispatch])
    const component = mount(<ToDoPage />)
    const todoInput = component.find('.Todo__input')

    todoInput.simulate('change', { target: { value: 'test' } })
    todoInput.simulate('keyDown', { key: 'Enter' })

    expect(dispatch).toHaveBeenCalledWith('createTodo')
    expect(createTodoMockAction).toHaveBeenCalledWith('test')
  })

  test('should disable input and render spinner when todo is creating', () => {
    const initState = getInitState({ isCreating: true })
    useStore.mockImplementation(() => [initState, dispatch])
    const creation = shallow(<ToDoPage />).find('.Todo__creation')

    expect(creation.find('.Todo__input').prop('disabled')).toBe(true)
    expect(creation.find('Spinner').exists()).toBe(true)
  })
})

describe('Todo actions', () => {
  test('should dispatch toggleAllTodos action when use', () => {
    const toggleAllTodosMockAction = jest
      .spyOn(actions, 'toggleAllTodos')
      .mockReturnValue('toggleAllTodos')
    const initState = getInitState()
    useStore.mockImplementation(() => [initState, dispatch])
    const component = mount(<ToDoPage />)

    component
      .find('[data-test-id="toggle-all-todo"]')
      .simulate('change', { target: { checked: true } })

    expect(dispatch).toHaveBeenCalledWith('toggleAllTodos')
    expect(toggleAllTodosMockAction).toHaveBeenNthCalledWith(1, true)

    component
      .find('[data-test-id="toggle-all-todo"]')
      .simulate('change', { target: { checked: false } })
    expect(toggleAllTodosMockAction).toHaveBeenNthCalledWith(2, false)
  })

  test('should dispatch deleteAllTodos action when use click to delete all todos button', () => {
    jest.spyOn(actions, 'deleteAllTodos').mockReturnValue('deleteAllTodos')
    const initState = getInitState()
    useStore.mockImplementation(() => [initState, dispatch])
    const component = shallow(<ToDoPage />)
    component.find('[data-test-id="delete-all-todos"]').simulate('click')

    expect(dispatch).toHaveBeenCalledWith('deleteAllTodos')
  })
})
