import React from 'react';
import {render, fireEvent, waitForElement} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'
import {Router} from 'react-router-dom'
import ToDoPage from './ToDoPage';
import {PageRoutes} from '../routes/page.route'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom/'

beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
        value: {
            getItem: jest.fn(() => null),
            setItem: jest.fn(() => null)
        },
        writable: true
    });
});
test('run TodoPAge', () => {
    const history = createMemoryHistory()
    // @ts-ignore
    const {getByText, container} = render(<ToDoPage history={history}/>);
    const TodoTitle = getByText("What need to be done?")
    expect(TodoTitle).toBeInTheDocument();
});
test('test adding ', async () => {
    const history = createMemoryHistory()
    history.push('/todo')
    // @ts-ignore
    const {getByText, container,findByText} = render(<ToDoPage />);
    let TodoItems = container.getElementsByClassName('Todo__items').item(0);

    expect(TodoItems).toBeDefined();

    const beforeAddNew = TodoItems!!.children.length;
    const TodoInput = container.getElementsByClassName('Todo__input').item(0);
    expect(TodoInput).toBeDefined();
    fireEvent.change(TodoInput!!, {target: {value: 'add_todos_1'}})
    // @ts-ignore
    expect(TodoInput!!.value).toBe('add_todos_1');
    await fireEvent.keyDown(TodoInput!!, {key: 'Enter', code: 'Enter'})
    // @ts-ignore
    expect(TodoInput!!.value).toBe('');
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(2);
    // await waitForElement(TodoItems);
    // console.log(TodoItems.childElementCount)
    // @ts-ignore
    await userEvent.type(TodoInput!!, "add_todos_2");
    // @ts-ignore
    expect(TodoInput!!.value).toBe('add_todos_2');
    await fireEvent.keyDown(TodoInput!!, {key: 'Enter', code: 'Enter'})
    // @ts-ignore
    expect(TodoInput!!.value).toBe('');
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(3);
    expect(findByText('add_todos_1')).toBeDefined()


});
