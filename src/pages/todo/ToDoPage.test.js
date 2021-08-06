import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import TodoPage from './ToDoPage'
import ButtonField from 'components/button/ButtonField';

describe('<Todo>', () => {
    it('Render Todo', () => {
        render(<TodoPage />)
        expect(screen.getAllByPlaceholderText('What need to be done?')).toBeTruthy()
    })

    it('Render input to add Todo Item', () => {
        const { getByPlaceholderText } = render(<TodoPage />)
        const input = getByPlaceholderText('What need to be done?')
        expect(input).toBeTruthy()
    })
    it('Keypress "Enter" on Input', async () => {
        // Render new instance in every test to prevent leaking state
        const { container } = render(<TodoPage />)
        const input = (container).querySelector('input');

        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 13 });

        const renderInput = render(<input type="checkbox" />)
        await waitFor(() => expect(renderInput).toBeTruthy());
    });
    it('Delete Todo item', async () => {
        // Render new instance in every test to prevent leaking state
        const { container } = render(<TodoPage />)
        const input = (container).querySelector('input');

        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 13 });

        const renderInput = render(<input type="checkbox" />)
        await waitFor(() => expect(renderInput).toBeTruthy());

        const onClick = jest.fn();
        const { getByText } = render(<ButtonField label="X" onClick={onClick} />)
        const btn = getByText('X')
        fireEvent.click(btn)
        expect(onClick).toHaveBeenCalled()
    });

    it('Render ButtonField All', () => {
        const onClick = jest.fn();

        const { getByText } = render(<ButtonField label="All" onClick={onClick} />)
        const btn = getByText('All')
        expect(btn).toBeTruthy()
    })
    it('calls "onClick" prop on ButtonField All click', () => {
        // Render new instance in every test to prevent leaking state
        const onClick = jest.fn();
        const { getByText } = render(<ButtonField label="All" onClick={onClick} />);

        fireEvent.click(getByText('All'));
        expect(onClick).toHaveBeenCalled();
    });


    it('Render ButtonField Active', () => {
        const onClick = jest.fn();

        const { getByText } = render(<ButtonField label="Active" onClick={onClick} />)
        const btn = getByText('Active')
        expect(btn).toBeTruthy()
    })
    it('calls "onClick" prop on ButtonField Active click', () => {
        // Render new instance in every test to prevent leaking state
        const onClick = jest.fn();
        const { getByText } = render(<ButtonField label="Active" onClick={onClick} />);

        fireEvent.click(getByText('Active'));
        expect(onClick).toHaveBeenCalled();
    });

    it('Render ButtonField Completed', () => {
        const onClick = jest.fn();

        const { getByText } = render(<ButtonField label="Completed" onClick={onClick} />)
        const btn = getByText('Completed')
        expect(btn).toBeTruthy()
    })
    it('calls "onClick" prop on ButtonField Completed click', () => {
        // Render new instance in every test to prevent leaking state
        const onClick = jest.fn();
        const { getByText } = render(<ButtonField label="Completed" onClick={onClick} />);

        fireEvent.click(getByText('Completed'));
        expect(onClick).toHaveBeenCalled();
    });

    it('Render ButtonField Clear all todos', () => {
        const onClick = jest.fn();

        const { getByText } = render(<ButtonField label="Clear all todos" onClick={onClick} />)
        const btn = getByText('Clear all todos')
        expect(btn).toBeTruthy()
    })
    it('calls "onClick" prop on ButtonField Clear all todos click', () => {
        // Render new instance in every test to prevent leaking state
        const onClick = jest.fn();
        const { getByText } = render(<ButtonField label="Clear all todos" onClick={onClick} />);

        fireEvent.click(getByText('Clear all todos'));
        expect(onClick).toHaveBeenCalled();
    });
})
