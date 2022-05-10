import React from 'react';
import {fireEvent, getByTestId, render, screen} from '@testing-library/react';
import {ItemListTodo} from "../index";
import {Design, InputAddTask} from "../../InputAddTask";
import {Todo, TodoStatus} from "../../../../models/todo";
import shortid from "shortid";

const mockData = [
    {
        content: "test 1",
        created_date: 'Tue May 10 2022',
        status: TodoStatus.ACTIVE,
        id: '123',
        user_id: "firstUser",
        is_important: false
    }
] as Todo

const setup = () => {
    const utils = render(<ItemListTodo todo={mockData} callback={jest.fn()} />)
    const inputCheckBox = utils.getByLabelText('check-all-todo')
    return {
        inputCheckBox,
        ...utils,
    }
}

describe('<ItemListTodo /> render', () => {
    it('should match snapshot', function () {
        const Element = render(<ItemListTodo todo={[]} callback={jest.fn()}/>);
        expect(Element.container.firstChild).toMatchSnapshot();
    });

    it('should rerender when change value', function () {

        render(<ItemListTodo todo={mockData} callback={jest.fn()} />)
        const checkbox = screen.getByTestId('check-todo')

        fireEvent.change(checkbox, {target: {checked: true}})

        expect(checkbox.ariaChecked).toBe(false)
    });
})