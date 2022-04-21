import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ToDoPage from '../ToDoPage';
import enzyme from 'enzyme';
import { render, fireEvent, getByTestId} from "@testing-library/react";
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });
describe("Test", () => {
    beforeAll(() => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query: any) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated
          removeListener: jest.fn(), // Deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }))
      });
    });
    
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
      });
    test('test ToDoPage', () => {
        const component = renderer.create(<ToDoPage />).toJSON();
        expect(component).toMatchSnapshot();
    });
    test('test event', () => {
        const { container, rerender } = render(<App />);
        const input = getByTestId(container, "Todo__input");
        fireEvent.change(input, {target: {value: 'todo 1'}})
        fireEvent.keyDown(input, { key: "Enter", code: 13 })
        const item = getByTestId(container, "Todo__item");
        expect(item).toBeTruthy()
    });
});
