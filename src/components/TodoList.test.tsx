import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react'
import { TodoContext } from "../store/context"
import { TodoList } from './TodoList';
import { TodoStatus } from '../models/todo';
import shortid from 'shortid';

const todoContextRender = (ui: ReactElement<any, any>, { providerProps, ...renderOptions }: any) => {
    return render(
        <TodoContext.Provider {...providerProps}>{ui}</TodoContext.Provider>,
        renderOptions,
    )
}

test('Display default text', () => {
    const providerProps = {
        value: {
            state: {
                todos: [],
            },
            dispatch: () => null
        }
    }
    todoContextRender(<TodoList />, { providerProps })
    expect(screen.queryAllByText('Enjoy your day!')).toHaveLength(1);
})

test('Hide default text', () => {
    const providerProps = {
        value: {
            state: {
                todos: [
                    {
                        content: 'This is a todo content',
                        created_date: new Date().toISOString(),
                        status: TodoStatus.ACTIVE,
                        id: shortid(),
                        user_id: "firstUser"
                    }
                ],
            },
            dispatch: () => null
        }
    }
    todoContextRender(<TodoList />, { providerProps });
    // make sure default span isn't exist
    expect(screen.queryAllByText('Enjoy your day!')).toHaveLength(0);
})

test('Display active todo', () => {
    const providerProps = {
        value: {
            state: {
                todos: [
                    {
                        content: 'This is a active todo',
                        created_date: new Date().toISOString(),
                        status: TodoStatus.ACTIVE,
                        id: shortid(),
                        user_id: "firstUser"
                    }
                ],
            },
            dispatch: () => null
        }
    }
    todoContextRender(<TodoList />, { providerProps });
    expect(screen.getByRole('checkbox')).not.toBeChecked();
})

test('Display completed todo', () => {
    const providerProps = {
        value: {
            state: {
                todos: [
                    {
                        content: 'This is a completed todo',
                        created_date: new Date().toISOString(),
                        status: TodoStatus.COMPLETED,
                        id: shortid(),
                        user_id: "firstUser"
                    }
                ],
            },
            dispatch: () => null
        }
    }
    todoContextRender(<TodoList />, { providerProps });
    expect(screen.getByRole('checkbox')).toBeChecked();
})
