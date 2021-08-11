import React from 'react'
import { render, fireEvent, screen } from '../../test-utils'
import TodoPage from './TodoPage'
import { act } from 'react-dom/test-utils';

test('Test add todo', async () => {
    await act(async() => {
        render(<TodoPage />);
    });
    const input = screen.getByPlaceholderText('What need to be done?') as HTMLInputElement
    fireEvent.change(input, {
        target: {value: 'Do test'},
    })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    setTimeout(() =>{
        expect(screen.getByTitle('Do test')).toBeInTheDocument();
    },1000)
    
   
})