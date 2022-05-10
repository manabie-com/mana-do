import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Design, InputAddTask} from "../index";

const setup = (value?:string) => {
    const utils = render(<InputAddTask typeCallback="" callback={jest.fn()} value={value} />)
    const input = utils.getByLabelText('todo-input')
    return {
        input,
        ...utils,
    }
}

describe('<InputAddTask /> render', () => {
    it('should match snapshot', function () {
        const Element = render(<InputAddTask typeCallback="" callback={jest.fn()}/>);
        expect(Element.container.firstChild).toMatchSnapshot();
    });
    it('should callback value when keydown Enter', function () {
        const {input} = setup()
        fireEvent.keyDown(input, {key: "Enter"})
        fireEvent.change(input, {current: {value: "123123"}})
        expect(input.nodeValue).toBe('23')
    });
    it('should rerender when change value', function () {
        const {rerender} = render(<InputAddTask typeCallback="" callback={jest.fn()} value="123" design={Design.UPDATE} />)
        expect(screen.getByTestId('todo-input')).toHaveTextContent('1')

        // re-render the same component with different props
        rerender(<InputAddTask callback={jest.fn()} typeCallback="" value="456" design={Design.UPDATE}/>)
        expect(screen.getByTestId('todo-input')).toHaveTextContent('456')
    });
})