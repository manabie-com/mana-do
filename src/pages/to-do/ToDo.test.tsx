import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react'
import { Route, Router } from 'react-router';
import ToDoPage from '.'

test("should create new todo successfully", async () => {
    const history = createMemoryHistory();
    const screen = render(
      <Router history={history}>
        <Route path="/" exact component={ToDoPage}/>
      </Router>,
    );

    let input = await waitFor(() => screen.getByTestId('add-todo'));
    userEvent.type(input, "test todo")
    expect(input).toHaveValue("test todo")
    userEvent.keyboard('{enter}')
    let todoList =  await waitFor(() => screen.getByTestId("todo-list"));
    expect(todoList).toHaveTextContent("test todo")
})

