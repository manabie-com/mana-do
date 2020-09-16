import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter, Route } from 'react-router-dom';
import configStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute';
import TodoPage from '../../../pages/todo';

const mockStore = configStore();

describe('<ProtectedRoute />', () => {
  it('Should render corectly', () => {
    const store = mockStore({ auth: {} });
    const wrapper = shallow(<Provider store={store}><ProtectedRoute /></Provider>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should <Redirect /> when unlogin', () => {
    const initState = {
      auth: {
        isLogin: false,
      }
    };
    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoute />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(TodoPage)).toHaveLength(0);
  });

  it('Should render Route when login', () => {
    const initState = {
      auth: {
        isLogin: true,
      }
    };
    const store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoute path='/todo' component={TodoPage} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(TodoPage)).toHaveLength(1);
  });
});