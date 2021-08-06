import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import App from './App';
import renderer from 'react-test-renderer';

const mockStore = configureStore([]);

jest.mock('@material-ui/core', () => {
  const materialUI = jest.requireActual('@material-ui/core');
  return {
    ...materialUI,
    Menu: jest.fn(({ children, open }) => (open ? children : null)),
  };
});

jest.mock('@material-ui/core/Snackbar', () => ({
  __esModule: true,
  default: ({ children }: any) => <>{children}</>,
}));


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe('APP COMPONENT', () => {
  let store: any = null;
  let wrapper: any = null;

  beforeEach(() => {
    spyOn(ReactGA, 'initialize');
    store = mockStore({
      auth: { ACCESS_TOKEN: false },
    });
    wrapper = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  it('SHOULD MATCHED SNAPSHOT', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});