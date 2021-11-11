import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import SignInPage from '../pages/SignInPage';
import PrivateRoute from '../shared/PrivatedRoute';
import ToDoPage from '../pages/TodoPage';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import userService from '../service/user.service';
import { mockUser } from './mockData';

Enzyme.configure({ adapter: new Adapter() });

describe('Test PrivateRoute', () => {
  it('should show TodoPage component when user logged', async () => {
    jest.spyOn(userService, "getToken").mockReturnValue(mockUser.token);
    const component = mount(<MemoryRouter>
      <PrivateRoute component={ToDoPage} />
    </MemoryRouter>
    );
    expect(component.find(ToDoPage)).toHaveLength(1);
  })

  it('should not show TodoPage component when user not logged', () => {
    jest.spyOn(userService, "getToken").mockReturnValue("");
    const component = mount(<MemoryRouter>
      <PrivateRoute component={ToDoPage} />
    </MemoryRouter>
    );
    expect(component.find(SignInPage)).toHaveLength(0);
  })
})