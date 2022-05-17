import { render } from "@testing-library/react";
import ToDoPage from "./ToDoPage";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Todo, TodoStatus } from './models/todo';
import shortid from 'shortid';
import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() })

describe('testing todo page', () => {
  beforeEach(() => {
    
  })

  test('should render input', () => {
    const wrapper = mount(<ToDoPage />);
    const input = wrapper.find('input.Todo__input');
    expect(input).toBeTruthy();
  })

  test('should fetch todo', async () => {
    const mockTodos: Todo[] = [
      {
        content: 'Mock todo 1',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
      },
      {
        content: 'Mock todo 2',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
      },
      {
        content: 'Mock todo 3',
        created_date: new Date().toISOString(),
        status: TodoStatus.ACTIVE,
        id: shortid(),
        user_id: "firstUser",
      },
    ]

    jest.spyOn(global, "fetch").mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockTodos)
      })
    })

    await act(async () => {
      render(<ToDoPage />)
    })
  })

})