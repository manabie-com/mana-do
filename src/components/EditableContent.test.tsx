import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import { EditableContent } from './EditableContent';

test('able to edit content on double click', async () => {
    const onChangeHandler = (newContent: string): void => {
        // make sure the value of input has been updated and new content is correct
        expect(screen.getByRole('textbox')).toHaveValue('The content has been changed!');
        expect(newContent).toBe('The content has been changed!');
    }

    render(<EditableContent content="This is content" onChange={onChangeHandler} />);
    fireEvent.doubleClick(screen.getByText('This is content'));

    // make sure the span is replaced by the input
    expect(screen.queryAllByText('This is content')).toHaveLength(0);
    expect(screen.getByRole('textbox')).toHaveValue('This is content');

    // update value and hit enter
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'The content has been changed!' } })
    fireEvent.keyUp(screen.getByRole('textbox'), { key: 'Enter', code: 'Enter', charCode: 13 })
})

test('cancel edit on blur', async () => {
    const onChangeHandler = (newContent: string): void => {
        throw new Error('onChange function should not be called on blur');
    }
    render(<EditableContent content="This is content" onChange={onChangeHandler} />)
    fireEvent.doubleClick(screen.getByText('This is content'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'The content has been changed!' } });
    fireEvent.blur(screen.getByRole('textbox'));
    // make sure the input is removed and the content is not changed
    expect(screen.queryAllByText('This is content')).toHaveLength(1);
})

test('onChange function should not be called if new content is empty', async () => {
    const onChangeHandler = (newContent: string): void => {
        throw new Error('onChange function should not be called if the new content is empty');
    }
    render(<EditableContent content="This is content" onChange={onChangeHandler} />)
    fireEvent.doubleClick(screen.getByText('This is content'));
    // update input value to empty and hit enter
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
    fireEvent.keyUp(screen.getByRole('textbox'), { key: 'Enter', code: 'Enter', charCode: 13 })
    // make sure the input is removed and the content is not changed
    expect(screen.queryAllByText('This is content')).toHaveLength(1);
})